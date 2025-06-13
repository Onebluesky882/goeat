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

import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
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
  @Roles('owner')
  create(@Body() body: CreateShopDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ShopsService.create(body, userId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    console.log('🛬 Request received. ID:', id);
    return this.ShopsService.getById(id);
  }
  // update
  @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(@Param('id') id: string, @Body() body: UpdateShopDto) {
    return this.ShopsService.update(id, body);
  }

  // delete
  @UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string) {
    return this.ShopsService.delete(id);
  }
}
