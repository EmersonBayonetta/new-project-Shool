import type { Assignment, Data, User, PlanItem } from './types.ts';
import { dateOffset, localDate } from './utils.ts';
export * from './types.ts';
export * from './utils.ts';
export * from './demo.ts';
export function completedSteps(data: Data, a: Assignment, userId: string) { return data.progress.find(p => p.assignmentId === a.id && p.userId === userId)?.completed ?? {}; }
export function metrics(data: Data, a: Assignment, userId: string) {
    const done = completedSteps(data, a, userId);
    const count = a.steps.filter(s => done[s.id]).length;
    const percent = a.steps.length ? (count === a.steps.length ? 100 : Math.min(99, Math.round(count / a.steps.length * 100))) : 0;
    const remaining = a.steps.filter(s => !done[s.id]);
    const minutes = remaining.reduce((sum, s) => sum + s.minutes, 0);
    const days = Math.round((new Date(a.due + 'T12:00:00').getTime() - new Date(dateOffset() + 'T12:00:00').getTime()) / 86400000);
    const priority = percent === 100 ? 'Concluída' : days < 0 ? 'Atrasada' : days <= 2 || minutes > Math.max(days, 1) * 90 ? 'Urgente' : days <= 5 ? 'Atenção' : 'Em dia';
    return { count, percent, remaining, minutes, days, priority, explanation: percent === 100 ? 'Todas as etapas concluídas.' : `${days < 0 ? `Prazo vencido há ${-days} dia(s)` : `Entrega em ${days} dia(s)`}, ${remaining.length} etapa(s) e ${minutes} min pendentes.` };
}
export function xp(data: Data, userId: string) {
    return data.assignments.reduce((sum, a) => {
        const m = metrics(data, a, userId);
        const done = completedSteps(data, a, userId);
        const early = m.percent === 100 && a.steps.every(s => done[s.id] && localDate(new Date(done[s.id])) <= a.due);
        return sum + m.count * 10 + (m.percent === 100 ? 30 + (early ? 20 : 0) : 0);
    }, 0);
}
export function ordered(data: Data, user: User) { return data.assignments.filter(a => a.classId === user.classId).toSorted((a, b) => { const rank: Record<string, number> = { Atrasada: 0, Urgente: 1, Atenção: 2, 'Em dia': 3, Concluída: 4 }; return rank[metrics(data, a, user.id).priority] - rank[metrics(data, b, user.id).priority] || a.due.localeCompare(b.due); }); }
export function recovery(data: Data, user: User): PlanItem[] {
    let minutes = 0;
    let day = 0;
    return ordered(data, user).filter(a => metrics(data, a, user.id).days <= 5).flatMap(a => metrics(data, a, user.id).remaining.map(s => {
        if (minutes > 0 && minutes + s.minutes > 120) { day++; minutes = 0; }
        const date = dateOffset(day);
        if (s.minutes > 120) { day += Math.ceil(s.minutes / 120); minutes = 0; }
        else minutes += s.minutes;
        return { assignmentId: a.id, stepId: s.id, date };
    }));
}
export function toggleStep(data: Data, assignmentId: string, stepId: string, userId: string): Data {
    const a = data.assignments.find(x => x.id === assignmentId);
    if (!a?.steps.some(s => s.id === stepId))
        return data;
    const current = completedSteps(data, a, userId);
    const completed = { ...current };
    if (completed[stepId])
        delete completed[stepId];
    else
        completed[stepId] = new Date().toISOString();
    return { ...data, progress: [...data.progress.filter(p => p.assignmentId !== assignmentId || p.userId !== userId), { assignmentId, userId, completed }] };
}
