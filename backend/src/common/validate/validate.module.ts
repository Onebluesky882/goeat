import { Module } from '@nestjs/common';
import { ValidateService } from './validate.service';

@Module({
  exports: [ValidateService],
})
export class ValidateModule {}
