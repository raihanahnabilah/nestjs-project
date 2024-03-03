import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { CreateTaskDto, GetTasksFilterDto } from './tasks.dto';
import { TaskStatus } from './tasks.model';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

// @CustomRepository(Task)
// export class TasksRepository extends Repository<Task> {
//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     const { title, description } = createTaskDto;

//     const task = this.create({
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     });

//     await this.save(task);
//     return task;
//   }
// }

@Injectable()
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository');
  
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); // create query object -> this is like a query builder
    query.where({ user });

    if (status) {
      // console.log('Here');
      query.andWhere('task.status = :status', { status }); // :status is essentially a variable
    }

    if (search) {
      // console.log('There');
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` }, // percentage sign is to find the incomplete string like "Clea"
      );
    }

    // console.log('Here besties');
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user "${user.username}. Filters: "${JSON.stringify(filterDto)}`,
      error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}

// Authentication -> to verify that somebody is who they claim to be
// Authorization -> letting somebody into a specific system, depending on identity and permission
