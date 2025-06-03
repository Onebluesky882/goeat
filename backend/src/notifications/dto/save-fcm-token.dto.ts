// src/notifications/dto/save-fcm-token.dto.ts
import { IsString, IsUUID } from 'class-validator';

export class SaveFcmTokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;
}
