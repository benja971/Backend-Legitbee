import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.type';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'findOneUser' })
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('user') user: CreateUserInput) {
    return this.usersService.create(user);
  }
}
