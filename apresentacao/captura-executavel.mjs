import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import assert from 'node:assert/strict'

// Zero dependências: Chrome DevTools Protocol via WebSocket nativo do Node 24.
const chrome = process.env.TRILHA_BROWSER || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const profile = await mkdtemp(join(tmpdir(), 'trilha-browser-'))
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { windowsHide: true, stdio: 'ignore' })
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-extensions', '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--remote-debugging-port=9223', '--user-data-dir=' + profile, 'about:blank'], { windowsHide: true, stdio: 'ignore' })
let socket, counter = 0
const pending = new Map(), errors = [], results = []
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
async function waitUntil(fn, timeout = 15000) { const start = Date.now(); while (Date.now() - start < timeout) { try { if (await fn()) return } catch {} await pause(100) } throw new Error('Tempo esgotado esperando condição') }
function call(method, params = {}) { return new Promise((resolve, reject) => { const id = ++counter; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('CDP timeout: ' + method)) } }, 15000).unref() }) }
async function evaluate(expression) { const r = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ': ' + JSON.stringify(r.exceptionDetails.exception)); return r.result.value }
async function click(text) { await evaluate(`(() => { const b = [...document.querySelectorAll('button,a')].find(e => e.textContent.trim().includes(${JSON.stringify(text)})); if (!b) throw Error('Botão ausente: '+${JSON.stringify(text)}); b.click() })()`); await pause(180) }
async function nav(route) { await evaluate(`location.hash=${JSON.stringify('/' + route)}`); await pause(180) }
async function setValue(selector, value) { await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(selector)}); if (!e) throw Error('Campo ausente'); const setter = Object.getOwnPropertyDescriptor(e instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : e instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype, 'value').set; setter.call(e, ${JSON.stringify(value)}); e.dispatchEvent(new Event('input',{bubbles:true})); e.dispatchEvent(new Event('change',{bubbles:true})); })()`); await pause(100) }
async function stored() { return evaluate(`new Promise((resolve,reject)=>{const r=indexedDB.open('trilha-academica',1);r.onsuccess=()=>{const db=r.result;const tx=db.transaction('state');const get=tx.objectStore('state').get('data');get.onsuccess=()=>resolve(get.result);tx.oncomplete=()=>db.close();get.onerror=()=>reject(get.error)}})`) }
async function check(name, fn) { await fn(); results.push(name); console.log('✓ ' + name) }

try {
 await waitUntil(async () => (await fetch('http://127.0.0.1:4173')).ok)
 let target; await waitUntil(async () => {target=(await(await fetch('http://127.0.0.1:9223/json')).json()).find(t=>t.type==='page');return !!target})
 socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}))
 socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result)}})
 await call('Page.enable');await call('Page.navigate',{url:'http://127.0.0.1:4173'});await call('Runtime.enable')
 await waitUntil(()=>evaluate("!!document.querySelector('.hero-panel')"))
 async function shot(name, mobile=false){await call('Emulation.setDeviceMetricsOverride',{width:mobile?390:1440,height:mobile?844:990,deviceScaleFactor:1,mobile});await pause(4500);const s=await call('Page.captureScreenshot',{format:'png'});await writeFile('../apresentacao/telas/'+name+'.png',Buffer.from(s.data,'base64'));console.log(name)}
 await mkdir('../apresentacao/telas',{recursive:true})
 await shot('dashboard');await shot('mobile',true)
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:990,deviceScaleFactor:1,mobile:false})
 await nav('atividades');await shot('atividades')
 await click('Lista de');await shot('etapas-antes');await evaluate("document.querySelector('dialog input[type=checkbox]').click()");await shot('etapas-depois');await evaluate("document.querySelector('dialog header button').click()")
 await nav('calendario');await shot('calendario')
 await nav('plano');await click('Gerar e aceitar plano');await shot('plano')
 await nav('conquistas');await shot('conquistas')
 await nav('assistente');await click('O que devo fazer primeiro?');await shot('assistente')
 await nav('estudos');await shot('notas');await evaluate("document.querySelector('fieldset').scrollIntoView({block:'center'})");await shot('quiz')
 await nav('comunidade');await shot('comunidade');await nav('mural');await shot('mural')
 await nav('inicio');await click('Ajuda e tour');await shot('acessibilidade');await evaluate("document.querySelector('dialog header button').click()")
 await click('Simular offline');await evaluate('window.scrollTo(0,document.body.scrollHeight)');await shot('offline');await click('Encerrar');await evaluate('window.scrollTo(0,0)')
 await setValue('select[aria-label="Perfil demonstrativo"]','professor');await nav('atividades');await click('Nova atividade');await shot('professor-formulario');await evaluate("document.querySelector('dialog header button').click()");await nav('inicio');await evaluate("document.querySelector('.table-wrap').scrollIntoView({block:'center'})");await shot('professor-entregas')
 await setValue('select[aria-label="Perfil demonstrativo"]','administrador');await nav('gestao');await shot('administracao');await nav('totem');await shot('totem')
 await setValue('select[aria-label="Perfil demonstrativo"]','aluno');await nav('inicio');await evaluate("document.querySelector('button[aria-label=\"Alternar tema\"]').click()");await shot('tema-escuro')
}finally{socket?.close();browser.kill();server.kill()}
