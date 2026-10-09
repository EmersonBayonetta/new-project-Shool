export type Role = 'aluno' | 'professor' | 'administrador';
export interface User {
    id: string;
    name: string;
    role: Role;
    classId: string;
    subjectId: string;
}
export interface Step {
    id: string;
    title: string;
    minutes: number;
}
export interface Assignment {
    id: string;
    title: string;
    description: string;
    instructions: string;
    notes: string;
    subjectId: string;
    classId: string;
    teacherId: string;
    createdAt: string;
    due: string;
    steps: Step[];
}
export interface Progress {
    userId: string;
    assignmentId: string;
    completed: Record<string, string>;
}
export interface Message {
    id: string;
    title: string;
    body: string;
    authorId: string;
    classId: string;
    date: string;
    readBy: string[];
}
export interface Note {
    id: string;
    userId: string;
    title: string;
    body: string;
    subjectId: string;
}
export interface Post {
    id: string;
    userId: string;
    classId: string;
    body: string;
    date: string;
    comments: {
        id: string;
        userId: string;
        body: string;
    }[];
}
export interface Extension {
    id: string;
    assignmentId: string;
    userId: string;
    date: string;
    reason: string;
    status: 'pendente' | 'aprovada' | 'rejeitada';
    response: string;
}
export interface PlanItem {
    assignmentId: string;
    stepId: string;
    date: string;
}
export interface Data {
    users: User[];
    classes: {
        id: string;
        name: string;
    }[];
    subjects: {
        id: string;
        name: string;
        color: string;
    }[];
    assignments: Assignment[];
    progress: Progress[];
    announcements: Message[];
    notes: Note[];
    posts: Post[];
    extensions: Extension[];
    plans: Record<string, PlanItem[]>;
    checklist: {
        id: string;
        userId: string;
        title: string;
        done: boolean;
    }[];
    attempts: {
        id: string;
        userId: string;
        subjectId: string;
        score: number;
        total: number;
        date: string;
    }[];
    goals: Record<string, number>;
}
