import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { tables } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { TableDto } from './table.dto';

@Injectable()
export class TablesService {
  private readonly logger = new Logger(TablesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(dto: TableDto, shopId: string, userId: string) {
    try {
      const inserted = await this.db
        .insert(tables)
        .values({ ...dto, shopId: shopId, createdById: userId })
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

  async getAll(shopId: string) {
    try {
      const result = await this.db
        .select({
          shopId: tables.shopId,
          status: tables.status,
          createdById: tables.createdById,
          layoutId: tables.layoutId,
          name: tables.name,
          number: tables.number,
          position: tables.position,
          tableLink: tables.tableLink,
        })
        .from(tables)
        .where(eq(tables.shopId, shopId));
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

  async getById(id: string, shopId: string) {
    try {
      const result = await this.db
        .select({
          shopId: tables.shopId,
          status: tables.status,
          createdById: tables.createdById,
          layoutId: tables.layoutId,
          name: tables.name,
          number: tables.number,
          position: tables.position,
          tableLink: tables.tableLink,
        })
        .from(tables)
        .where(and(eq(tables.id, id), eq(tables.shopId, shopId)));
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

  async update(id: string, body: TableDto, shopId: string) {
    try {
      const updated = await this.db
        .update(tables)
        .set(body)
        .where(and(eq(tables.id, id), eq(tables, shopId)))
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
  async delete(id: string, shopId: string) {
    try {
      await this.db
        .delete(tables)
        .where(and(eq(tables.id, id), eq(tables.shopId, shopId)))
        .returning();
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
