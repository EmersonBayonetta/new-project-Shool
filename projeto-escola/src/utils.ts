export const id = () => crypto.randomUUID();
export function dateOffset(days = 0) { const d = new Date(); d.setDate(d.getDate() + days); return localDate(d); }
export function localDate(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
export const formatDate = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
