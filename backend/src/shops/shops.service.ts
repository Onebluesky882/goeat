import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CreateShopDto, UpdateShopDto } from './shops.dto';

@Injectable()
export class ShopsService {
  private readonly logger = new Logger(ShopsService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(dto: CreateShopDto, userId: string) {
    try {
      const inserted = await this.db
        .insert(shops)
        .values({ ...dto, ownerId: userId, active: true })
        .returning();
      return {
        success: true,
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create shop', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'shop already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the shop.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const result = await this.db
        .select({
          id: shops.id,
          name: shops.name,
          ownerId: shops.ownerId,
          address: shops.address,
          updatedAt: shops.updatedAt,
          active: shops.active,
        })
        .from(shops);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch shop',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db
        .select({
          name: shops.name,
          ownerId: shops.ownerId,
          address: shops.address,
          updatedAt: shops.updatedAt,
          active: shops.active,
        })
        .from(shops)
        .where(and(eq(shops.id, id)));
      return {
        data: result[0],
        success: true,
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

  async update(id: string, body: UpdateShopDto) {
    try {
      const updated = await this.db
        .update(shops)
        .set(body)
        .where(eq(shops.id, id))
        .returning();
      return {
        data: updated,
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update shop ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string) {
    try {
      await this.db.delete(shops).where(eq(shops.id, id));
      return {
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete shop',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
