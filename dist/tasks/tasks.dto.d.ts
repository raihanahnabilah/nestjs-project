import { TaskStatus } from './tasks.model';
export declare class CreateTaskDto {
    title: string;
    description: string;
}
export declare class UpdateTaskStatusDto {
    status: TaskStatus;
}
export declare class GetTasksFilterDto {
    status?: TaskStatus;
    search?: string;
}
