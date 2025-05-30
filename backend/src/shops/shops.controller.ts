import {
  Controller,
  Req,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthRequest } from 'src/types/auth';
import { ShopDto } from './shops.dto';
import { ShopsService } from './shops.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tables')
export class TablesController {
  constructor() {}
}

@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles('owner')
  create(@Body() body: ShopDto, @Req() req: AuthRequest) {
    const userId = req.user.id;

    return this.ShopsService.create(body, userId);
  }
  //getAll

  @Get()
  getAll() {
    return this.ShopsService.getAll();
  }
  // get by id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.ShopsService.getById(id);
  }

  // update
  @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(@Param('id') id: string, @Body() body: ShopDto) {
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
