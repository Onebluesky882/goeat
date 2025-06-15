import {
  Controller,
  Req,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthRequest } from 'src/types/auth';
import { CreateShopDto, UpdateShopDto } from './shops.dto';
import { ShopsService } from './shops.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}
  //getAll
  // @UseGuards(ShopAccessGuard)
  @Get()
  getAll() {
    return this.ShopsService.getAll();
  }

  @Post()
  // @Roles('owner')
  create(@Body() body: CreateShopDto, @Req() req: AuthRequest) {
    console.log('req.user =', req.user);
    const userId = req.user.id;
    console.log('userId :', userId);
    return this.ShopsService.create(body, userId);
  }

  @Get(':id')
  getById(@Param('id') id: string, @Req() req: AuthRequest) {
    console.log('req.user :', req.user);
    return this.ShopsService.getById(id);
  }
  // update
  @Patch(':id')
  @Roles('manager', 'owner')
  update(@Param('id') id: string, @Body() body: UpdateShopDto) {
    return this.ShopsService.update(id, body);
  }

  // delete
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string) {
    return this.ShopsService.delete(id);
  }
}
