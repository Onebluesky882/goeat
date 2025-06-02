import { Module } from '@nestjs/common';
import { ImageAccessGuard } from 'src/common/guards/image-access.guard';
import { ImagesService } from './images.service';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesController } from './images.controller';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [ValidateModule, DatabaseModule],
  providers: [ImagesService, ImageAccessGuard],
})
export class ImagesModule {}
