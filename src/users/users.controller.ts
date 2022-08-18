import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Post('login')
  login(@Body() loginUserInput: LoginUserInput) {
    return this.usersService.login(loginUserInput);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(userId, updateUserInput);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }
}
