import { test } from 'node:test'
import assert from 'node:assert/strict'
import { seed, xp, metrics, toggleStep, recovery, ordered, dateOffset } from '../src/domain.ts'

test('seed possui relações consistentes e prazos relativos', () => {
  const d = seed()
  for (const a of d.assignments) {
    assert.ok(d.classes.some(c => c.id === a.classId))
    assert.ok(d.subjects.some(s => s.id === a.subjectId))
    assert.ok(d.users.some(u => u.id === a.teacherId && u.role === 'professor'))
    assert.ok(a.steps.every(s => s.minutes > 0))
  }
  assert.equal(d.assignments[1].due, dateOffset(1))
})
test('etapas atualizam progresso e XP sem duplicação e são reversíveis', () => {
  const d = seed(), a = d.assignments[1], before = xp(d, 'student')
  const once = toggleStep(d, a.id, a.steps[0].id, 'student')
  assert.equal(metrics(once, a, 'student').percent, 33)
  assert.equal(xp(once, 'student'), before + 10)
  const undo = toggleStep(once, a.id, a.steps[0].id, 'student')
  assert.equal(xp(undo, 'student'), before)
  assert.equal(xp(toggleStep(undo, a.id, a.steps[0].id, 'student'), 'student'), before + 10)
})
test('conclusão antes do prazo soma bônus e desfazer remove os bônus', () => {
  const d = seed(), a = d.assignments[1], before = xp(d, 'student')
  const done = a.steps.reduce((d, s) => toggleStep(d, a.id, s.id, 'student'), d)
  assert.equal(metrics(done, a, 'student').priority, 'Concluída')
  assert.equal(xp(done, 'student'), before + 80)
  assert.equal(xp(toggleStep(done, a.id, a.steps[0].id, 'student'), 'student'), before + 20)
})
test('progresso de alunos diferentes permanece separado', () => {
  const d = seed(), a = d.assignments[1]
  const changed = toggleStep(d, a.id, a.steps[0].id, 'student')
  assert.equal(metrics(changed, a, 'student2').percent, 0)
  assert.equal(metrics(changed, a, 'student').percent, 33)
})
test('plano não altera prazos oficiais e só inclui etapas pendentes', () => {
  const d = seed(), original = structuredClone(d), user = d.users[0], plan = recovery(d, user)
  assert.deepEqual(d, original)
  assert.ok(plan.length > 0)
  for (const item of plan) {
    const a = d.assignments.find(a => a.id === item.assignmentId)
    assert.ok(metrics(d, a, user.id).remaining.some(s => s.id === item.stepId))
  }
})
test('prioridade é explicável e ordenação coloca pendências antes de concluídas', () => {
  const d = seed(), list = ordered(d, d.users[0])
  assert.equal(metrics(d, list[0], 'student').priority, 'Atrasada')
  assert.equal(metrics(d, list.at(-1), 'student').priority, 'Concluída')
  assert.match(metrics(d, list[0], 'student').explanation, /etapa.*min/)
})
test('alterar prazo preserva progresso individual', () => {
  const d = seed(), a = { ...d.assignments[0], due: dateOffset(15) }
  const changed = { ...d, assignments: d.assignments.map(x => x.id === a.id ? a : x) }
  assert.equal(metrics(changed, a, 'student').count, 1)
  assert.equal(metrics(changed, a, 'student').priority, 'Em dia')
})
test('etapa inexistente não gera pontuação', () => {
  const d = seed()
  assert.equal(toggleStep(d, 'a1', 'missing', 'student'), d)
})
test('arredondamento nunca conclui uma atividade com etapas pendentes', () => {
  const d = seed()
  const a = { ...d.assignments[1], steps: Array.from({ length: 250 }, (_, i) => ({ id: 'long' + i, title: 'Etapa ' + i, minutes: 1 })) }
  const changed = { ...d, assignments: [a], progress: [{ assignmentId: a.id, userId: 'student', completed: Object.fromEntries(a.steps.slice(0, 249).map(s => [s.id, new Date().toISOString()])) }] }
  assert.equal(metrics(changed, a, 'student').percent, 99)
  assert.equal(xp(changed, 'student'), 2490)
})
test('planejamento respeita capacidade diária com etapas de até 120 minutos', () => {
  const d = seed(), plan = recovery(d, d.users[0]), days = {}
  for (const item of plan) {
    const a = d.assignments.find(a => a.id === item.assignmentId)
    const step = a.steps.find(s => s.id === item.stepId)
    days[item.date] = (days[item.date] ?? 0) + step.minutes
  }
  assert.ok(Object.values(days).every(minutes => minutes <= 120))
})
