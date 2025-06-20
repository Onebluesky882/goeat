import {
  Controller,
  Req,
  UseGuards,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'types/auth';
import { ImagesService } from './images.service';
import { ImageDto } from './images.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { R2Service } from 'src/r2/r2.service';

@Controller('images')
@UseGuards(AuthGuard('jwt'))
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly r2Service: R2Service,
  ) {}

  // @UseGuards(ImageAccessGuard)
  //create
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ImageDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    const uploadedUrl = await this.r2Service.uploadFile(file);
    return this.imagesService.saveImageToDb(dto, file, uploadedUrl, userId);
  }
}
