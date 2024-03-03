import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.model';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') // automatically generated the ID
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(_type => User, user => user.tasks, { eager: false }) // eager: true can only be set on one side, not the other
  @Exclude({ toPlainOnly: true })
  @JoinColumn()
  user: User;
}

// Active record vs data mapper
// Active record -> define CRUD methods inside the entity itself
// Interact with actual modal -> provided from BaseEntity
// Can add additional function
// DataMapper -> Models the same way in a very dumb way -> Models have nothing more than properties and maybe some function that has nothing to do with database interaction
// To interact with the database -> set up a repository!

// Active record -> less clean, can be messy
// DataMapper -> more clean and maintanable

// Interceptor -> when a request comes in, you can either process the data, change the data and transform it 