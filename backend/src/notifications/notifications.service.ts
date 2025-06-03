import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  orders,
  schema,
  userFcmToken,
  customers,
  shops,
  menus,
} from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { SaveFcmTokenDto } from './dto/save-fcm-token.dto';
import { users } from '../database/schema/users';
import { eq } from 'drizzle-orm';
import { firebaseAdmin } from 'src/lib/firebase/firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async sendNotification(
    token: string,
    shopName: string = 'shop name',
    menuName: string = 'item name',
  ) {
    try {
      await firebaseAdmin.messaging().send({
        token,
        notification: {
          title: `Order from ${shopName}  is ready`,
          body: `Your ${menuName} is ready for pickup at the shop`,
        },
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
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
      console.error('Failed to save FCM token:', error);
      throw error;
    }
  }

  async notifyCustomer(orderId: string) {
    try {
      const result = await this.db
        .select({
          userId: users.id,
          token: userFcmToken.token,
          shopName: shops.name,
          menuName: menus.name,
        })
        .from(orders)
        .innerJoin(customers, eq(orders.customerId, customers.id))
        .innerJoin(users, eq(customers.userId, users.id))
        .leftJoin(shops, eq(orders.shopId, shops.id))
        .leftJoin(menus, eq(menus.id, orders.menuId))
        .leftJoin(userFcmToken, eq(users.id, userFcmToken.userId))
        .where(eq(orders.id, orderId))
        .limit(1);

      const record = result[0];
      if (!record?.token) {
        console.log('no FCM token found');
        return;
      }

      await this.sendNotification(
        record.token,
        record.shopName ?? 'shop name',
        record.menuName ?? 'menu name',
      );
    } catch (error) {
      console.error('Failed to notify customer:', error);
    }
  }
}
