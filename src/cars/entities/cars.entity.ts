import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({ default: true })
  isActive: boolean;
}
