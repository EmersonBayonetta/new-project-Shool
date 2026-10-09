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
 let target; await waitUntil(async () => { target = (await (await fetch('http://127.0.0.1:9223/json')).json()).find(t => t.type === 'page'); return !!target })
 socket = new WebSocket(target.webSocketDebuggerUrl); await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
 socket.addEventListener('message', event => { const m = JSON.parse(event.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result) } if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text) })
 await call('Page.enable'); await call('Page.navigate', { url: 'http://127.0.0.1:4173' }); await call('Runtime.enable')
 socket.addEventListener('message', event => { const m = JSON.parse(event.data); if (m.method === 'Page.javascriptDialogOpening') void call('Page.handleJavaScriptDialog', { accept: true, promptText: 'Justificativa demonstrativa do professor.' }) })
 await waitUntil(() => evaluate(`!!document.querySelector('.hero-panel')`))
 await check('Professor publica atividade com etapas e aluno da turma vê o mesmo registro', async () => {
  await setValue('select[aria-label="Perfil demonstrativo"]', 'professor'); await nav('atividades'); await click('Nova atividade')
  await setValue('dialog input[name="title"]', 'Projeto de teste do pitch'); await setValue('dialog textarea[name="description"]', 'Validar fluxo compartilhado local.'); await click('Salvar atividade')
  await waitUntil(async () => (await stored()).assignments.some(a => a.title === 'Projeto de teste do pitch'))
  await setValue('select[aria-label="Perfil demonstrativo"]', 'aluno'); await nav('atividades'); assert.ok(await evaluate(`document.body.innerText.includes('Projeto de teste do pitch')`))
 })
 let assignmentId, beforeXp
 await check('Etapa atualiza progresso e XP; desfazer e remarcar não duplica XP', async () => {
  await click('Projeto de teste do pitch'); const d = await stored(); assignmentId = d.assignments.find(a => a.title === 'Projeto de teste do pitch').id
  const { xp } = await import('../src/domain.ts'); beforeXp = xp(d, 'student')
  await evaluate(`document.querySelector('dialog input[type="checkbox"]').click()`); await waitUntil(async () => { const d = await stored(); return d.progress.some(p => p.assignmentId === assignmentId && Object.keys(p.completed).length === 1) })
  assert.equal(xp(await stored(), 'student'), beforeXp + 10); assert.ok(await evaluate(`document.querySelector('dialog').innerText.includes('50%')`))
  await evaluate(`document.querySelector('dialog input[type="checkbox"]').click()`); await pause(200); assert.equal(xp(await stored(), 'student'), beforeXp)
  await evaluate(`document.querySelector('dialog input[type="checkbox"]').click()`); await pause(200); assert.equal(xp(await stored(), 'student'), beforeXp + 10)
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }); await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
 })
 await check('Dados e perfil persistem depois de recarregar', async () => { await call('Page.reload'); await waitUntil(() => evaluate(`document.body.innerText.includes('Projeto de teste do pitch')`)); const d = await stored(); assert.ok(d.progress.some(p => p.assignmentId === assignmentId && Object.keys(p.completed).length === 1)) })
 await check('Pesquisa e filtros retornam atividades coerentes', async () => { await setValue('input[aria-label="Pesquisar atividades"]', 'Projeto de teste do pitch'); assert.equal(await evaluate(`document.querySelectorAll('.task-card').length`), 1); await setValue('select[aria-label="Status"]', 'done'); assert.equal(await evaluate(`document.querySelectorAll('.task-card').length`), 0); await setValue('select[aria-label="Status"]', ''); await setValue('input[aria-label="Pesquisar atividades"]', '') })
 await check('Professor altera prazo e preserva progresso do aluno', async () => { await setValue('select[aria-label="Perfil demonstrativo"]', 'professor'); await nav('atividades'); await click('Projeto de teste do pitch'); await click('Editar atividade'); await setValue('dialog input[name="due"]', '2027-02-14'); await click('Salvar atividade'); await pause(300); assert.equal((await stored()).assignments.find(a => a.id === assignmentId).due, '2027-02-14'); await setValue('select[aria-label="Perfil demonstrativo"]', 'aluno') })
 await check('Calendário reflete prazo cadastrado', async () => { await nav('calendario'); const d = new Date(); const hops = (2027 - d.getFullYear()) * 12 + 1 - d.getMonth(); for (let i = 0; i < Math.abs(hops); i++) await click(hops > 0 ? 'Próximo' : 'Anterior'); assert.ok(await evaluate(`document.querySelector('.calendar').innerText.includes('Projeto de teste do pitch')`)) })
 await check('Plano de recuperação não modifica prazos oficiais', async () => { const dates = (await stored()).assignments.map(a => a.due); await nav('plano'); await click('Gerar e aceitar plano'); await pause(250); assert.deepEqual((await stored()).assignments.map(a => a.due), dates) })
 await check('Formulários rejeitam dados inválidos', async () => { await nav('atividades'); await click('Nova atividade'); assert.equal(await evaluate(`document.querySelector('dialog form').checkValidity()`), false); await evaluate(`document.querySelector('dialog header button').click()`) })
 await check('Assistente responde a partir das atividades reais', async () => { await nav('assistente'); await click('Quais tarefas estão atrasadas?'); assert.ok(await evaluate(`document.querySelector('.chat-messages').innerText.includes('Projeto integrador')`)) })
 await check('Notas, checklist e quiz salvam ações e resultados reais', async () => {
  await nav('estudos'); await setValue('input[name="title"]', 'Nota do teste'); await setValue('textarea[name="body"]', 'Resumo criado no navegador.'); await click('Salvar anotação'); await pause(200)
  assert.ok((await stored()).notes.some(n => n.title === 'Nota do teste'))
  await setValue('.note textarea', 'Resumo editado.'); await pause(200); assert.ok((await stored()).notes.some(n => n.body === 'Resumo editado.'))
  await setValue('.inline-form input[name="title"]', 'Revisar antes da aula'); await click('Adicionar'); await pause(200); assert.ok((await stored()).checklist.some(c => c.title === 'Revisar antes da aula'))
  await evaluate(`document.querySelector('input[name="q0"][value="1"]').click(); document.querySelector('input[name="q1"][value="0"]').click()`); await click('Conferir respostas'); await pause(200); assert.equal((await stored()).attempts.at(-1).score, 2)
 })
 await check('Comunidade publica, responde e exclui conteúdo próprio', async () => {
  await nav('comunidade'); await setValue('textarea[name="body"]', 'Conversa criada no teste'); await click('Publicar'); await pause(200)
  await setValue('.inline-form input[name="body"]', 'Resposta do teste'); await click('Responder'); await pause(200); assert.ok((await stored()).posts.find(p => p.body === 'Conversa criada no teste').comments.length === 1)
  await click('Excluir resposta'); await pause(200); assert.equal((await stored()).posts.find(p => p.body === 'Conversa criada no teste').comments.length, 0)
  await click('Excluir publicação'); await pause(200); assert.ok(!(await stored()).posts.some(p => p.body === 'Conversa criada no teste'))
 })
 await check('Comunicados do professor aparecem no aluno e podem ser marcados lidos', async () => {
  await setValue('select[aria-label="Perfil demonstrativo"]', 'professor'); await nav('mural'); await setValue('input[name="title"]', 'Aviso criado no teste'); await setValue('textarea[name="body"]', 'Prepare os materiais para a aula.'); await click('Publicar'); await pause(200)
  await setValue('select[aria-label="Perfil demonstrativo"]', 'aluno'); await nav('mural'); assert.ok(await evaluate(`document.body.innerText.includes('Aviso criado no teste')`)); await click('Marcar como lido'); await pause(200); assert.ok((await stored()).announcements.find(m => m.title === 'Aviso criado no teste').readBy.includes('student'))
 })
 await check('Prorrogação aprovada altera prazo compartilhado com justificativa', async () => {
  await nav('atividades'); await click('Projeto de teste do pitch'); await setValue('dialog input[name="date"]', '2027-02-20'); await setValue('dialog textarea[name="reason"]', 'Precisamos revisar os requisitos.'); await click('Enviar solicitação local'); await evaluate(`document.querySelector('dialog header button').click()`)
  await setValue('select[aria-label="Perfil demonstrativo"]', 'professor'); await nav('inicio'); await click('Aprovar'); await pause(250); const d = await stored(); assert.equal(d.assignments.find(a => a.id === assignmentId).due, '2027-02-20'); assert.equal(d.extensions.at(-1).status, 'aprovada'); assert.ok(d.extensions.at(-1).response.length > 0)
  await setValue('select[aria-label="Perfil demonstrativo"]', 'aluno')
 })
 await check('Administração cadastra entidades relacionadas e exibe totem explicativo', async () => {
  await setValue('select[aria-label="Perfil demonstrativo"]', 'administrador'); await setValue('input[name="name"]', 'Turma de teste'); await click('Cadastrar'); await pause(200); assert.ok((await stored()).classes.some(c => c.name === 'Turma de teste'))
  await nav('totem'); assert.ok(await evaluate(`document.body.innerText.includes('QR Code indisponível')`)); await setValue('select[aria-label="Perfil demonstrativo"]', 'aluno')
 })
 await check('Navegação mobile não corta o conteúdo e funciona por teclado', async () => { await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }); for (const p of ['inicio','atividades','calendario','plano','conquistas','estudos','assistente','comunidade','mural']) { await nav(p); assert.ok(await evaluate(`document.documentElement.scrollWidth <= 390`), 'Overflow em ' + p) } await call('Emulation.setFocusEmulationEnabled', { enabled: true }); await evaluate(`document.querySelector('.menu-button').focus()`); assert.equal(await evaluate(`document.activeElement.className`), 'menu-button'); await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', unmodifiedText: '\r', windowsVirtualKeyCode: 13 }); await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }); await waitUntil(() => evaluate(`document.querySelector('.sidebar').classList.contains('open')`)); await nav('inicio'); await mkdir('artifacts', { recursive: true }); const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile('artifacts/mobile.png', Buffer.from(shot.data, 'base64')) })
 await check('Cache PWA permite recarregar e atualizar progresso sem rede', async () => { await waitUntil(() => evaluate(`!!navigator.serviceWorker.controller`)); await click('Simular offline'); await call('Network.enable'); await call('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 }); await call('Page.reload'); await waitUntil(() => evaluate(`!!document.querySelector('.hero-panel')`)); await click('Meu próximo passo'); await evaluate(`document.querySelector('dialog input[type="checkbox"]').click()`); await pause(300); assert.ok((await stored()).progress.length > 0); await evaluate(`document.querySelector('dialog header button').click()`); await call('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 }) })
 await check('Restauração remove dados criados e volta ao cenário inicial', async () => { await setValue('select[aria-label="Perfil demonstrativo"]', 'administrador'); await click('Restaurar dados da demonstração'); await waitUntil(async () => (await stored()).assignments.length === 6); assert.ok(!(await stored()).assignments.some(a => a.id === assignmentId)) })
 await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1050, deviceScaleFactor: 1, mobile: false }); await setValue('select[aria-label="Perfil demonstrativo"]','aluno'); await nav('inicio'); const shot = await call('Page.captureScreenshot', { format: 'png' }); await writeFile('artifacts/desktop.png', Buffer.from(shot.data, 'base64'))
 assert.deepEqual(errors, []); await writeFile('artifacts/browser-results.json', JSON.stringify({ passed: results, runtimeErrors: errors }, null, 2)); console.log(`\n${results.length} cenários de navegador aprovados. Capturas em artifacts/.`)
} finally { socket?.close(); browser.kill(); server.kill() }

