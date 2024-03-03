import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import {
  CreateTaskDto,
  GetTasksFilterDto,
  UpdateTaskStatusDto,
} from './tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';

@Injectable() // allows services to be injected to other parts of the application
export class TasksService {
  constructor(
    // @InjectRepository(Task)
    @Inject(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const found = await this.tasksRepository.findOneBy({ id });
    const found = await this.tasksRepository.findOne({ where: { id, user } });


    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // const { title, description } = createTaskDto;

    // const task = this.tasksRepository.create({
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // });

    // await this.tasksRepository.save(task);
    // return task;
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    updateTaskDto: UpdateTaskStatusDto,
    user: User
  ): Promise<Task> {
    const { status } = updateTaskDto;
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  /// NOT USED ANYMORE ////

  // private tasks: Task[] = []; // if we make it public, technically other parts of the app can access it but it can be accidentally mutated so not good practice

  // // This is public by default
  // getAllTasks() {
  //   return this.tasks;
  // }

  // getAllTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let result: Task[];
  //   if (status) {
  //     result = this.tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     result = this.tasks.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search) ||
  //         task.description.toLowerCase().includes(search)
  //       ) {
  //         return true;
  //       }

  //       return false;
  //     });
  //   }

  //   // if (search) {
  //   //   result = this.tasks.filter((task) =>
  //   //     task.title.toLowerCase().includes(search),
  //   //   );
  //   //   console.log(result);
  //   // }

  //   return result;
  // }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }

  //   return found;
  // }

  // // needs to create an object that corresponds to it!
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(), // we can auto generate ID
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // // not the best method -- will be replaced by typeorm
  // deleteTask(id: string): string {
  //   const findTask = this.getTaskById(id);
  //   this.tasks.splice(this.tasks.indexOf(findTask), 1); // the second parameter means the number of elements to remove
  //   // this.tasks = this.tasks.filter((task) => task.id !== id);
  //   return 'Task is removed!';
  // }

  // updateTaskStatus(id: string, updateTaskDto: UpdateTaskStatusDto): Task {
  //   const { status } = updateTaskDto;
  //   const findTask = this.getTaskById(id);
  //   findTask.status = status;
  //   return findTask;
  // }
}
