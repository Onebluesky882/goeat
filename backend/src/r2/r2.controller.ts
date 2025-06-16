import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { R2Service } from './r2.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('r2')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const results = await Promise.all(
      files.map((file) => this.r2Service.uploadFile(file)),
    );
    return results;
  }
}
