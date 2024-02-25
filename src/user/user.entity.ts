import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
// @Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //telling typeorm that the username should be unique, if it's not unique, then it will generate an error -> statusCode: 409
  username: string;

  @Column()
  password: string;
}
