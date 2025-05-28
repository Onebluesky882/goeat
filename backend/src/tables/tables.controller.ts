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
import { TablesService } from './tables.service';
import { AuthGuard } from '@nestjs/passport';
import { InsertTable, UpdateTable } from './table.dto';
import { AuthRequest } from 'src/types/auth';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  create(@Body() body: InsertTable, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.tablesService.create(body, userId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.tablesService.getAll(userId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.tablesService.getById(id, userId);
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
    return this.tablesService.update(id, body, userId);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.tablesService.delete(id, userId);
  }
}
