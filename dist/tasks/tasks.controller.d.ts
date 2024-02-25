import { TasksService } from './tasks.service';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './tasks.dto';
import { Task } from './tasks.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTaskStatus(id: string, updateTaskDto: UpdateTaskStatusDto): Promise<Task>;
}
