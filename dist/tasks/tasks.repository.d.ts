import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto, GetTasksFilterDto } from './tasks.dto';
export declare class TasksRepository extends Repository<Task> {
    private dataSource;
    constructor(dataSource: DataSource);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
