import { TasksService } from './tasks.service';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './tasks.dto';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';
export declare class TasksController {
    private tasksService;
    private logger;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string, user: User): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTask(id: string, user: User): Promise<void>;
    updateTaskStatus(id: string, updateTaskDto: UpdateTaskStatusDto, user: User): Promise<Task>;
}
