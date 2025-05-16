import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';
import { MenuInsertDto } from './menus.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-menu')
  insert(@Body() newMenu: MenuInsertDto) {
    return this.menusService.insertData(newMenu);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('menu')
  getMenu() {
    return this.getMenu();
  }
}
