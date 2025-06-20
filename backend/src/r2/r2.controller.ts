import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { R2Service } from './r2.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('r2')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log('got file', file);
    const result = await this.r2Service.uploadFile(file);
    console.log('result :', result);
    return result;
  }
}
