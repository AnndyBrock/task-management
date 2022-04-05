import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}