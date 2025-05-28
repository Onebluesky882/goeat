import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthRequest } from 'src/types/auth';
import { AuthGuard } from '@nestjs/passport';
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './pages.dto';
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  create(@Body() body: CreatePageDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.create(body, userId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.allPages(userId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.getPageById(id, userId);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePageDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    return this.pagesService.update({ id, name: body.name }, userId);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.delete(id, userId);
  }
}
