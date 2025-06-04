import { Inject, Injectable, Logger } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { firebaseAdmin } from 'src/lib/firebase';
import { getMessaging } from 'firebase-admin/messaging';

import {
  orders,
  schema,
  userFcmToken,
  customers,
  shops,
  menus,
  orderTable,
} from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { SaveFcmTokenDto } from './dto/save-fcm-token.dto';
import { users } from '../database/schema/users';
import { eq } from 'drizzle-orm';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}
  // todo add orderTableId
  async sendNotification(
    token: string,
    shopName: string = 'shop name',
    menuName: string = 'item name',
    orderId: string = 'order id',
  ) {
    try {
      const response = await getMessaging(firebaseAdmin).send({
        token,
        notification: {
          title: `Order : ${orderId} from ${shopName} is ready`,
          body: `Your ${menuName} is ready for pickup at the shop`,
        },
      });
      this.logger.log(`Notification sent: ${response}`);
      return response;
    } catch (error) {
      this.logger.error('Failed to send notification:', error);
    }
  }

  async saveFcmToken(dto: SaveFcmTokenDto) {
    try {
      const { userId, token } = dto;

      const existing = await this.db
        .select()
        .from(userFcmToken)
        .where(eq(userFcmToken.userId, userId))
        .limit(1);

      if (existing.length > 0) {
        await this.db
          .update(userFcmToken)
          .set({ token, updatedAt: new Date() })
          .where(eq(userFcmToken.userId, userId));
      } else {
        await this.db.insert(userFcmToken).values({
          userId,
          token,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return { success: true };
    } catch (error) {
      this.logger.error('Failed to save FCM token:', error);
      throw error;
    }
  }

  async notifyCustomer(orderId: string) {
    try {
      const orderTableResult = await this.db
        .select({
          id: orderTable.id,
          token: orderTable.token,
          orderCode: orderTable.orderCode,
        })
        .from(orderTable)
        .where(eq(orderTable.orderCode, orderId))
        .limit(1);

      const orderTableRecord = orderTableResult[0];

      if (!orderTableRecord) {
        this.logger.warn('OrderTable not found for orderId:', orderId);
        return;
      }
      const result = await this.db
        .select({
          shopName: shops.name,
          customers: users.nickname,
          menuName: menus.name,
          quantity: orders.quantity,
        })
        .from(orderTable)
        .innerJoin(shops, eq(orderTable.shopId, shops.id))
        .innerJoin(customers, eq(orderTable.customersId, customers.id))
        .innerJoin(users, eq(customers.userId, users.id))
        .innerJoin(orders, eq(orderTable.id, orders.orderTableId))
        .innerJoin(menus, eq(orders.menuId, menus.id))
        .where(eq(orderTable.id, orderTableRecord.id));

      if (result.length === 0) {
        this.logger.warn(
          'No order/menu data found for orderTable:',
          orderTableRecord.id,
        );
        return;
      }

      const shopName = result[0].shopName;
      const customerName = result[0].customers;

      const menuMap = new Map<string, number>();
      for (const item of result) {
        const key = item.menuName;
        const qty =
          typeof item.quantity === 'number'
            ? item.quantity
            : parseInt(item.quantity || '1', 10);
        menuMap.set(key, (menuMap.get(key) || 0) + qty);
      }
      const menuList = Array.from(menuMap.entries())
        .map(([name, qty]) => `${qty}x ${name}`)
        .join(', ');

      await this.sendNotification(
        orderTableRecord.token as string,
        `${shopName} : Order ${orderTableRecord.orderCode}`,
        `${customerName} , your order : ${menuList} is ready`,
      );
    } catch (error) {
      this.logger.error('Failed to notify customer:', error);
    }
  }
}
