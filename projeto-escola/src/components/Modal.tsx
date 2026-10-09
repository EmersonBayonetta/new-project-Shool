import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
export function Modal({ title, children, close }: {
    title: string;
    children: ReactNode;
    close: () => void;
}) { const ref = useRef<HTMLDialogElement>(null); useEffect(() => { const d = ref.current; d?.showModal(); return () => d?.close(); }, []); return <dialog ref={ref} onCancel={close}><header><h2>{title}</h2><button aria-label="Fechar painel" onClick={close}>×</button></header>{children}</dialog>; }
