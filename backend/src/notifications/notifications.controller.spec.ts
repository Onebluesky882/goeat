// notifications.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('customer')
  async notify(@Body('orderId') orderId: string) {
    await this.notificationsService.notifyCustomer(orderId);
    return { success: true };
  }
}
