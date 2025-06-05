import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from 'src/database/database.module';
import { FirebaseModule } from 'src/lib/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
