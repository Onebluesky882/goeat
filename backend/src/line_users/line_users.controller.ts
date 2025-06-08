import { Body, Controller, Post } from '@nestjs/common';
import { LineUsersService } from './line_users.service';
import { LineUsersDto } from './line_users.dto';

@Controller('line-users')
export class LineUsersController {
  constructor(private readonly lineUsersService: LineUsersService) {}

  // store line user to our db
  @Post()
  create(@Body() body: LineUsersDto) {
    return this.lineUsersService.create(body);
  }
}
