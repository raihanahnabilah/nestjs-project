import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './tasks.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTaskStatus(id: string, updateTaskDto: UpdateTaskStatusDto): Promise<Task>;
}
