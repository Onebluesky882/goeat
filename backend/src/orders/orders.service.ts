import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employees, roles, shops, orders } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { InsertOrders, UpdateOrder } from './orders.dto';
import { ShopAccessService } from 'src/shop-access/shop-access.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly shopAccess: ShopAccessService,
  ) {}

  async create(newOrder: InsertOrders, shopId: string, userId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, [
        'manager',
        'staff',
        'owner',
      ]);
      const inserted = await this.db
        .insert(orders)
        .values({ ...newOrder, shopId: shopId })
        .returning();
      return {
        success: true,
        message: 'create order successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create ', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'order already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the order.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(shopId: string, userId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, [
        'manager',
        'staff',
        'owner',
      ]);
      const result = await this.db
        .select({
          status: orders.status,
          name: orders.shopId,
          orderTableId: orders.orderTableId,
          createdAt: orders.createdAt,
          updatedAt: orders.updatedAt,
          shopId: orders.shopId,
          menuId: orders.menuId,
          customerId: orders.customerId,
          quantity: orders.quantity,
          priceEach: orders.priceEach,
        })
        .from(orders)
        .where(eq(orders.shopId, shopId));

      return {
        success: true,
        message: 'Fetched all orders successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch order',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, shopId: string, userId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, [
        'manager',
        'staff',
        'owner',
      ]);
      const order = await this.db
        .select({
          status: orders.status,
          name: orders.shopId,
          orderTableId: orders.orderTableId,
          createdAt: orders.createdAt,
          updatedAt: orders.updatedAt,
          shopId: orders.shopId,
          menuId: orders.menuId,
          customerId: orders.customerId,
          quantity: orders.quantity,
          priceEach: orders.priceEach,
        })
        .from(orders)
        .innerJoin(shops, eq(orders.shopId, shops.id))
        .where(and(eq(orders.id, id), eq(shops.ownerId, shopId)));

      if (order.length === 0) {
        throw new HttpException(
          'You do not have permission to access this order.',
          HttpStatus.NOT_FOUND,
        );
      }

      const result = await this.db
        .select({ id: orders.id })
        .from(orders)
        .where(eq(orders.id, id));
      return {
        data: result[0],
        success: true,
        message: 'Fetched order by ID successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'unable to fetch by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, body: UpdateOrder, shopId: string, userId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, [
        'manager',
        'staff',
        'owner',
      ]);
      const order = await this.db
        .select({ id: orders.id })
        .from(orders)
        .innerJoin(shops, eq(orders.shopId, shops.id))
        .where(and(eq(orders.id, id), eq(shops.ownerId, shopId)));
      if (order.length === 0) {
        throw new HttpException(
          'You do not have permission to access this order.',
          HttpStatus.NOT_FOUND,
        );
      }

      const { menuId, quantity, updatedAt } = body;
      const updated = await this.db
        .update(orders)
        .set({ menuId, quantity, updatedAt })
        .where(eq(orders.id, id))
        .returning();
      return {
        data: updated,
        success: true,
        message: ' updated order success ',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update order ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string, shopId: string, userId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, [
        'manager',
        'staff',
        'owner',
      ]);
      await this.db.delete(orders).where(eq(orders.id, id));
      return {
        success: true,
        message: 'order deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete order',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
