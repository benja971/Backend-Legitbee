import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  car_id: number;

  @Column()
  user_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: true })
  isActive: boolean;
}
