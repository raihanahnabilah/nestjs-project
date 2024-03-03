import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './tasks.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string, user: User): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTask(id: string, user: User): Promise<void>;
    updateTaskStatus(id: string, updateTaskDto: UpdateTaskStatusDto, user: User): Promise<Task>;
}
