import { Injectable } from '@nestjs/common';
import {
  PutObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class R2Service {
  private s3: S3Client;
  private bucket: string;
  constructor(private configService: ConfigService) {
    if (
      !process.env.R2_ENDPOINT &&
      !process.env.R2_ACCESS_KEY_ID &&
      !process.env.R2_SECRET_ACCESS_KEY
    ) {
      console.error('R2 some value missing');
      return;
    }
    this.s3 = new S3Client({
      region: 'auth',
      endpoint: configService.get('R2_ENDPOINT'),
      credentials: {
        accessKeyId: configService.get('R2_ACCESS_KEY_ID')!,
        secretAccessKey: configService.get('R2_SECRET_ACCESS_KEY')!,
      },
    });
    this.bucket = configService.get('R2_BUCKET')!;
  }

  async uploadFile(file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await this.s3.send(command);
    return `https://${this.bucket}.${this.configService.get('R2_ENDPOINT')}/${file.originalname}`;
  }
}
