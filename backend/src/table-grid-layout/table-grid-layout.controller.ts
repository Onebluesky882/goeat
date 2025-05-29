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

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'src/types/auth';

@Controller('table-grid-layout')
export class TableGridLayoutController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  create(@Body() body: InsertTable, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ordersService.create(body, userId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ordersService.getAll(userId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ordersService.getById(id, userId);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTable,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    return this.ordersService.update(id, body, userId);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ordersService.delete(id, userId);
  }
}
