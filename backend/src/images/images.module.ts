import { Module } from '@nestjs/common';
import { ImageAccessGuard } from 'src/common/guards/image-access.guard';
import { ValidateService } from 'src/common/validate/validate.service';
import { ImagesService } from './images.service';

@Module({
  providers: [ImageAccessGuard, ImagesService],
})
export class ImagesModule {}
