import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';
import { MenuInsertDto } from './menus.dto';
import { AuthRequest } from '../types/auth';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  //   @UseGuards(AuthGuard('jwt'))
  @Post('add-menu')
  insert(@Body() newMenu: MenuInsertDto, @Req() req: AuthRequest) {
    try {
      return this.menusService.insertData(newMenu, req?.user?.id);
    } catch (error) {}
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getMenu() {
    return this.menusService.getMenuMatchShopId();
  }
}
