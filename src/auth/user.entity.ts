import { Task } from 'src/tasks/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
// @Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //telling typeorm that the username should be unique, if it's not unique, then it will generate an error -> statusCode: 409
  username: string;

  @Column()
  password: string;

  @OneToMany(_type => Task, task => task.user, { eager: true, cascade: true }) // this is to create the one to many relation!
  tasks: Task[];
}

