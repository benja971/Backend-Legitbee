import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { userProviders } from './users.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, ...userProviders],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
