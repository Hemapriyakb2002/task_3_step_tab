import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/entity/IUser';

@Entity({ name: "users" })
export class User implements IUser{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  password!: string;

  @Column()
  fileLink!: string;
}