import {readFile, writeFile} from 'node:fs/promises'
const base = (await readFile('tests/browser.mjs','utf8')).split('try {\n await waitUntil')[0]
const body = `
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
 await setValue('select[aria-label="Perfil demonstrativo"]','aluno');await nav('inicio');await evaluate("document.querySelector('button[aria-label=\\\"Alternar tema\\\"]').click()");await shot('tema-escuro')
}finally{socket?.close();browser.kill();server.kill()}
`
await writeFile('../apresentacao/captura-executavel.mjs',base+body)
