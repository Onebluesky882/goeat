import {
  BadRequestException,
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
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CategoryDto) {
    return this.categories.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.categories.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getById(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('name query parameter is required');
    }
    return this.categories.getByName(name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CategoryDto) {
    return this.categories.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categories.delete(id);
  }
}
