import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;
}
