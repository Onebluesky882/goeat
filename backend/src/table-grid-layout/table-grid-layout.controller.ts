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
  Query,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'src/types/auth';
import { TableGridLayoutService } from './table-grid-layout.service';
import { InsertTableGridLayout } from './table-grid-layout.dto';
import { ShopAccessService } from '../shop-access/shop-access.service';

@Controller('table-grid-layout')
export class TableGridLayoutController {
  constructor(
    private readonly tableGridLayout: TableGridLayoutService,
    private readonly shopAccess: ShopAccessService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  async create(
    @Body() body: InsertTableGridLayout,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    await this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.tableGridLayout.create(body, userId, shopId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Req() req: AuthRequest, @Query('shopId') shopId: string) {
    await this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.tableGridLayout.getAll(userId, shopId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    await this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.tableGridLayout.getById(id, userId, shopId);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: InsertTableGridLayout,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    await this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.tableGridLayout.update(id, body, userId, shopId);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    await this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.tableGridLayout.delete(id, userId, shopId);
  }
}
