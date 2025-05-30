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
import { ImagesService } from './images.service';
import { ImageAccessGuard } from 'src/common/guards/image-access.guard';
import { ImageDto } from './images.dto';

@Controller('images')
@UseGuards(AuthGuard('jwt'))
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(ImageAccessGuard)
  //create
  @Post()
  create(@Body() body: ImageDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.imagesService.create(body, userId);
  }
  //getAll
  @UseGuards(ImageAccessGuard)
  @Get()
  getAll(
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
    @Query('menuId') menuId: string,
  ) {
    const userId = req.user.id;
    return this.imagesService.getAll(userId, shopId, menuId);
  }
  // get by id
  @UseGuards(ImageAccessGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.imagesService.getById(id);
  }

  // update
  @UseGuards(ImageAccessGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: ImageDto,
    @Req() req: AuthRequest,
  ) {
    return this.imagesService.update(id, body);
  }

  // delete
  @UseGuards(ImageAccessGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.imagesService.delete(id);
  }
}
