import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { tableGridLayout } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { InsertTableGridLayout } from './table-grid-layout.dto';
import { ValidateService } from 'src/common/validate/validate.service';

@Injectable()
export class TableGridLayoutService {
  private readonly logger = new Logger(TableGridLayoutService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly shopAccess: ValidateService,
  ) {}

  async create(
    newTableLayout: InsertTableGridLayout,
    userId: string,
    shopId: string,
  ) {
    try {
      await this.shopAccess.validateShop(userId, shopId, ['owner', 'manager']);

      const queryBuilder = this.db
        .from(tableGridLayout)
        .where(eq(tableGridLayout.shopId, shopId));

      const inserted = await this.db
        .insert(tableGridLayout)
        .values({ ...newTableLayout, shopId: shopId })
        .returning();
      return {
        success: true,
        message: 'create Table GridLayout successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create table', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: ' Table GridLayout already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the Table GridLayout.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(userId, shopId);
      const result = await this.db
        .select({
          columns: tableGridLayout.columns,
          rows: tableGridLayout.rows,
        })
        .from(tableGridLayout)
        .where(and(eq(tableGridLayout.shopId, shopId)));

      return {
        success: true,
        message: 'Fetched all Table GridLayout successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch table layout',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(userId, shopId);

      const result = await this.db
        .select({
          columns: tableGridLayout.columns,
          rows: tableGridLayout.rows,
        })
        .from(tableGridLayout)
        .where(
          and(eq(tableGridLayout.id, id), eq(tableGridLayout.shopId, shopId)),
        );
      return {
        data: result[0],
        success: true,
        message: 'Fetched Table GridLayout by ID successfully',
      };
    } catch (error) {
      this.logger.error('Failed to fetch table layout by ID', error.stack);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch table layout by ID',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    body: InsertTableGridLayout,
    userId: string,
    shopId: string,
  ) {
    try {
      await this.shopAccess.validateShop(userId, shopId, ['owner', 'manager']);

      const updated = await this.db
        .update(tableGridLayout)
        .set({ columns: body.columns, rows: body.rows })
        .where(eq(tableGridLayout.id, id))
        .returning();
      return {
        data: updated,
        success: true,
        message: ' updated Table GridLayout success ',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update Table GridLayout ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string, userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(userId, shopId, ['owner', 'manager']);
      await this.db.delete(tableGridLayout).where(eq(tableGridLayout.id, id));
      return {
        success: true,
        message: 'Table GridLayout deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete Table GridLayout',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
