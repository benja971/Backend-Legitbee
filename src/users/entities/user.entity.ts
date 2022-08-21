import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
