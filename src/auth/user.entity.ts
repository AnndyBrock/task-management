import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({unique: true})
  user_name: string;

  @Column()
  password: string;

  @Column({unique: true ,default: null})
  email: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  created_date: Date

  @OneToMany(_type => Task, task => task.user, {eager: true})
  tasks: Task[];
}