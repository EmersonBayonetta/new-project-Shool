import { useState } from 'react';
import type { Assignment, Data, Step } from '../types';
import { id, dateOffset } from '../utils';
const field = (f: FormData, k: string) => String(f.get(k) ?? '').trim();
export function AssignmentForm({ data, assignment, classId, teacherId, save }: {
    data: Data;
    assignment?: Assignment;
    classId: string;
    teacherId: string;
    save: (a: Assignment) => void;
}) {
    const [steps, setSteps] = useState<Step[]>(assignment?.steps ?? [{ id: id(), title: 'Pesquisar e reunir referências', minutes: 25 }, { id: id(), title: 'Desenvolver e revisar', minutes: 45 }]), [error, setError] = useState('');
    return <form onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); if (!field(f, 'title') || !field(f, 'description') || !steps.length || steps.some(s => !s.title.trim() || s.minutes < 1 || s.minutes > 1440 || !Number.isFinite(s.minutes))) {
        setError('Preencha os campos e adicione pelo menos uma etapa com tempo válido.');
        return;
    } save({ id: assignment?.id ?? id(), title: field(f, 'title'), description: field(f, 'description'), instructions: field(f, 'instructions'), notes: assignment?.notes ?? '', subjectId: field(f, 'subjectId'), classId: field(f, 'classId'), teacherId: field(f, 'teacherId'), createdAt: assignment?.createdAt ?? dateOffset(), due: field(f, 'due'), steps }); }}>{error && <p role="alert" className="danger">{error}</p>}<label>Título<input name="title" required maxLength={160} defaultValue={assignment?.title}/></label><label>Descrição<textarea name="description" required defaultValue={assignment?.description}/></label><div className="form-grid"><label>Disciplina<select name="subjectId" defaultValue={assignment?.subjectId}>{data.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label>Turma<select name="classId" defaultValue={assignment?.classId ?? classId}>{data.classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Professor<select name="teacherId" defaultValue={assignment?.teacherId ?? teacherId}>{data.users.filter(u => u.role === 'professor').map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></label><label>Prazo oficial<input type="date" name="due" required defaultValue={assignment?.due ?? dateOffset(7)}/></label></div><label>Instruções<textarea name="instructions" defaultValue={assignment?.instructions}/></label><h3>Etapas</h3>{steps.map((s, i) => <div className="inline-form" key={s.id}><input required aria-label={'Título da etapa ' + (i + 1)} value={s.title} onChange={e => setSteps(steps.map(x => x.id === s.id ? { ...x, title: e.target.value } : x))}/><input required aria-label={'Minutos da etapa ' + (i + 1)} type="number" min="1" max="1440" value={s.minutes} onChange={e => setSteps(steps.map(x => x.id === s.id ? { ...x, minutes: Number(e.target.value) } : x))}/><button type="button" aria-label="Remover etapa" onClick={() => setSteps(steps.filter(x => x.id !== s.id))}>×</button></div>)}<div className="actions"><button type="button" className="secondary" onClick={() => setSteps([...steps, { id: id(), title: '', minutes: 25 }])}>+ Adicionar etapa</button><button className="button">Salvar atividade</button></div></form>;
}
