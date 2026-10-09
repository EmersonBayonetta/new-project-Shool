import type { Data } from './domain';
import { seed } from './domain';
const open = () => new Promise<IDBDatabase>((resolve, reject) => { const r = indexedDB.open('trilha-academica', 1); r.onupgradeneeded = () => r.result.createObjectStore('state'); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
export async function loadData(): Promise<Data> { const db = await open(); return new Promise((resolve, reject) => { const tx = db.transaction('state'); const r = tx.objectStore('state').get('data'); r.onsuccess = () => resolve(r.result ?? seed()); r.onerror = () => reject(r.error); tx.oncomplete = () => db.close(); }); }
let writeQueue: Promise<void> = Promise.resolve();
export function saveData(data: Data): Promise<void> {
    writeQueue = writeQueue.catch(() => {}).then(async () => {
        const db = await open();
        return new Promise<void>((resolve, reject) => {
            const tx = db.transaction('state', 'readwrite');
            tx.objectStore('state').put(data, 'data');
            tx.oncomplete = () => { db.close(); resolve(); };
            tx.onerror = () => { db.close(); reject(tx.error); };
            tx.onabort = () => { db.close(); reject(tx.error ?? new Error('Transação interrompida')); };
        });
    });
    return writeQueue;
}
