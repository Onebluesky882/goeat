import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('user')
  async createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.insertUser(newUser.email, newUser.name);
  }
}
