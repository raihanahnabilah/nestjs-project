import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  GetTasksFilterDto,
  UpdateTaskStatusDto,
} from './tasks.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private logger = new Logger('TasksController'); // instantiate the logger here
  // tasksService: TasksService;
  // constructor for the injector/services:
  constructor(private tasksService: TasksService) {
    // this.tasksService = tasksService;
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retrieving all tasks. Filters : ${JSON.stringify(filterDto)}`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto,
  @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskDto, user);
  }

  // @Get()
  // getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   // If we have any filters defined, then call tasksService.getTasksWithFilters
  //   // otherwise, just get all tasks
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getAllTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(
  //   @Body() createTaskDto: CreateTaskDto,
  //   // @Body('title') title: string,
  //   // @Body('description') description: string,
  // ): Task {
  //   // retrieve the entire request body
  //   // need to do some validation on the body
  //   // console.log('body', body);

  //   // specifically estract the parameters
  //   // return this.tasksService.createTask(title, description);
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskStatusDto,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, updateTaskDto);
  // }
}

// Data Transfer Object (DTO)
// Shape of the data changes all the time -> Task now is 'title', 'description' and we have to define this in controller and service.
// Would be tedious to change it!
// DTO -> object that carries data between application
// Dont have any behavior except for storage, retrieval, seralization and deserialization of its own data
// Result in increased performance
// Can be useful for data validation
// NOT a model definition --> defines the shape of data for a specific case. For instance: creating a task!
// Can be defined using interface or class -> recommended approach: use classes
// Interfaces are a part of Typescript and therefore are not preserved post-compilation
// Classes allow us to do more, and since they are a part of Javascript, they will be preserved post-compilation
// DTOs are not mandatory -> can still develop applications without using DTOs
// The value they add makes it worthwhile to use them when applicable -> easier to maintain and refacor your code

// ORM (Object Relational Mapping) -> technique that lets you query and manipulate data from a database, using an object-oriented paradigm
// Many ORM libraries that allow developers to communicate to the database using their preferred programming language -> rather than sending plain queries directly
// Pros and cons:
// pros -> writing data model in one place, easier to maintain. less repetition
// lots of things done automatically -- database handling, data types, relations, etc
// no need to write sql syntax (easy to learn, hard to master)
// database abstraction -- you can change the database type whenever you wish
// leverage OOP -> things like inheritance are easy
// cons -> have to learn it -> orm libraries are not always simple
// performance is alright but it's easy to neglect
// makes it easy to forget (or never learn) what's happening behind the scenes, which can lead to a variety of maintainability issues
