import { ObjectType } from '@nestjs/graphql';
import { Cars } from 'src/cars/entities/cars.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_car: number;

  @Column()
  id_user: number;

  // @OneToOne(() => Cars)
  // @JoinColumn()
  // car: Cars;

  // @OneToOne(() => Users)
  // @JoinColumn()
  // user: Users;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: true })
  isActive: boolean;
}
