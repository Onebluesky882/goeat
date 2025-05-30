import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { shops, orders } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CreateOrder, UpdateOrder } from './orders.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(
    newOrder: CreateOrder,
    shopId: string,
    userId: string,
    customerId: string,
  ) {
    try {
      const inserted = await this.db
        .insert(orders)
        .values({
          ...newOrder,
          shopId: shopId,
          createById: userId,
          customerId: customerId,
        })
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

  async getAll(shopId: string) {
    try {
      const result = await this.db
        .select({
          status: orders.status,
          orderTableId: orders.orderTableId,
          createdAt: orders.createdAt,
          createById: orders.createById,
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

  async getById(id: string, shopId: string) {
    try {
      const found = await this.db
        .select({
          status: orders.status,
          orderTableId: orders.orderTableId,
          createdAt: orders.createdAt,
          createById: orders.createById,
          updatedAt: orders.updatedAt,
          shopId: orders.shopId,
          menuId: orders.menuId,
          customerId: orders.customerId,
          quantity: orders.quantity,
          priceEach: orders.priceEach,
        })
        .from(orders)
        .innerJoin(shops, eq(orders.shopId, shops.id))
        .where(and(eq(orders.id, id), eq(shops.id, shopId)));

      if (found.length === 0) {
        throw new HttpException(
          'You do not have permission to access this order.',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: found[0],
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

  async update(id: string, body: UpdateOrder, shopId: string) {
    try {
      const updated = await this.db
        .update(orders)
        .set(body)
        .where(and(eq(orders.id, id), eq(orders.shopId, shopId)))
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
  async delete(id: string, shopId: string) {
    try {
      await this.db
        .delete(orders)
        .where(and(eq(orders.id, id), eq(orders.shopId, shopId)))
        .returning();
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
