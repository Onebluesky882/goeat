import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { shops, tables } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly logger = new Logger(OrdersService.name),
  ) {}

  async create(newTable: InsertTable, userId: string) {
    try {
      const inserted = await this.db
        .insert(tables)
        .values({ ...newTable, createBy: userId })
        .returning();
      return {
        success: true,
        message: 'create table successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create table', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'Table already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the table.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(userId: string) {
    try {
      const result = await this.db
        .select({
          tableLink: tables.tableLink,
          status: tables.status,
          name: tables.name,
        })
        .from(tables)
        .innerJoin(shops, eq(tables.shopId, shops.id))
        .where(eq(shops.ownerId, userId));

      return {
        success: true,
        message: 'Fetched all tables successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch table',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, userId: string) {
    try {
      const shop = await this.db
        .select({ shopId: tables.shopId })
        .from(tables)
        .innerJoin(shops, eq(tables.shopId, shops.id))
        .where(and(eq(tables.id, id), eq(shops.ownerId, userId)));

      if (shop.length === 0) {
        throw new HttpException(
          'You do not have permission to access this table.',
          HttpStatus.NOT_FOUND,
        );
      }

      const result = await this.db
        .select({ id: tables.id })
        .from(tables)
        .where(eq(tables.id, id));
      return {
        data: result[0],
        success: true,
        message: 'Fetched table by ID successfully',
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

  async update(id: string, body: UpdateTable, userId: string) {
    try {
      const table = await this.db
        .select({ id: tables.id })
        .from(tables)
        .innerJoin(shops, eq(tables.shopId, shops.id))
        .where(and(eq(tables.id, id), eq(shops.ownerId, userId)));
      if (table.length === 0) {
        throw new HttpException(
          'You do not have permission to access this table.',
          HttpStatus.NOT_FOUND,
        );
      }

      const { status, tableLink, gridPosition, name } = body;
      const updated = await this.db
        .update(tables)
        .set({ status, tableLink, gridPosition, name })
        .where(eq(tables.id, id))
        .returning();
      return {
        data: updated,
        success: true,
        message: ' updated table success ',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update table ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string, userId: string) {
    try {
      const table = await this.db
        .select({ id: tables.id })
        .from(tables)
        .innerJoin(shops, eq(tables.shopId, shops.id))
        .where(and(eq(tables.id, id), eq(shops.ownerId, userId)));
      if (table.length === 0) {
        throw new HttpException(
          'You do not have permission to access this table.',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.db.delete(tables).where(eq(tables.id, id));
      return {
        success: true,
        message: 'Table deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete Table',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
