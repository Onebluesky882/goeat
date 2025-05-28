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
import { CategoriesService } from './categories.service';
import { AuthRequest } from 'src/types/auth';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateCategoryDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.categories.create(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.categories.allCategories(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.categories.getCategoryById(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    return this.categories.update({ id, name: body.name }, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.categories.delete({ id }, userId);
  }
}
