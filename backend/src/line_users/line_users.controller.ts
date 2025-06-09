import { Controller, Post, Body } from '@nestjs/common';
import { LineUsersService } from './line_users.service';
import { LineUsersDto } from './line_users.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('line-users')
export class LineUsersController {
  constructor(
    private readonly lineUsersService: LineUsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createAndLogin(@Body() body: LineUsersDto) {
    await this.lineUsersService.create(body);
    return this.authService.loginByLine(body.userId);
  }
}
