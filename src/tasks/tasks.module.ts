import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { Task } from './tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    // TypeOrmExModule.forCustomRepository([TasksRepository]),
  ], //for feature -> for submodules
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
