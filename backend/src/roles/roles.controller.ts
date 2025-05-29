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
import { RolesService } from './roles.service';
import { Roles } from './roles.dto';
import { ShopAccessService } from '../shop-access/shop-access.service';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly shopAccess: ShopAccessService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  create(
    @Body() body: Roles,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.rolesService.create(body, userId, shopId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest, @Query('shopId') shopId: string) {
    const userId = req.user.id;
    return this.rolesService.getAll(userId, shopId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.rolesService.getById(id, userId, shopId);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Roles,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.rolesService.update(id, body, userId, shopId);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.rolesService.delete(id, userId, shopId);
  }
}
