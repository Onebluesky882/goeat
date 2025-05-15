import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('protected')
  getProtected(@Req() req) {
    return {
      message: 'Access granted',
      user: req.user,
    };
  }
}
