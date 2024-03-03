import { Task } from 'src/tasks/tasks.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    tasks: Task[];
}
