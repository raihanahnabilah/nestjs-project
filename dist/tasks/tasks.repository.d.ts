import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto, GetTasksFilterDto } from './tasks.dto';
import { User } from 'src/auth/user.entity';
export declare class TasksRepository extends Repository<Task> {
    private dataSource;
    private logger;
    constructor(dataSource: DataSource);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
}
