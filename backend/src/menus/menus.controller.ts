import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from '../types/auth';
import { MenuDto } from './menus.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  //create
  // @UseGuards(ShopAccessGuard)
  @Post()
  @Roles('manager', 'owner')
  create(
    @Body() body: MenuDto,
    @Query('shopId') shopId: string,
    @Req() req: AuthRequest,
  ) {
    return this.menusService.create(body, shopId, req.user.id);
  }
  //getAll
  // @UseGuards(ShopAccessGuard)
  @Get()
  @Roles('manager', 'owner', 'customer', 'guest', 'staff')
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.menusService.getAll(userId);
  }
  // get by id
  // @UseGuards(ShopAccessGuard)
  @Get(':id')
  @Roles('manager', 'owner', 'customer', 'guest', 'staff')
  getById(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.menusService.getById(id, shopId);
  }

  // update
  // @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: MenuDto,
    @Query('shopId') shopId: string,
  ) {
    return this.menusService.update(id, body, shopId);
  }

  // delete
  // @UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.menusService.delete(id, shopId);
  }
}
