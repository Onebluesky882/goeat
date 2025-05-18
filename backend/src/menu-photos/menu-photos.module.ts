import { Module } from '@nestjs/common';
import { MenuPhotosController } from './menu-photos.controller';
import { MenuPhotosService } from './menu-photos.service';

@Module({
  controllers: [MenuPhotosController],
  providers: [MenuPhotosService]
})
export class MenuPhotosModule {}
