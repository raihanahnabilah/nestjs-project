// This is essentially like an interface!
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus; // in react you can just do 'done' | 'in-progress' | 'open'
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
