import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.model';

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
}

// Active record vs data mapper
// Active record -> define CRUD methods inside the entity itself
// Interact with actual modal -> provided from BaseEntity
// Can add additional function
// DataMapper -> Models the same way in a very dumb way -> Models have nothing more than properties and maybe some function that has nothing to do with database interaction
// To interact with the database -> set up a repository!

// Active record -> less clean, can be messy
// DataMapper -> more clean and maintanable
