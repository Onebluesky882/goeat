import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { categories, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CreateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(body: CreateCategoryDto, userId: string) {
    try {
      const data = await this.db
        .insert(categories)
        .values({ ...body, userId })
        .returning();
      return {
        success: true,
        message: 'Category created successfully',
        data: data,
      };
    } catch (error) {
      this.logger.error('Insert failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'fail to insert new category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async allCategories(userId: string) {
    try {
      const data = await this.db
        .select({
          id: categories.id,
          name: categories.name,
          shopId: categories.shopId,
        })
        .from(categories)
        .innerJoin(shops, eq(categories.shopId, shops.id))
        .where(eq(categories.userId, userId));
      return { success: true, message: 'get all success', data: data };
    } catch (error) {
      this.logger.error('all categories failed ', error);
      throw new HttpException(
        { success: false, message: 'Failed to fetch categories' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCategoryById(id: string, userId: string) {
    try {
      const data = await this.db
        .select({
          name: categories.name,
        })
        .from(categories)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)));

      if (data.length === 0) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'get by id success',
        data: data[0],
      };
    } catch (error) {
      this.logger.error('Fetch failed', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(body: { id: string; name: string }, userId: string) {
    const { id, name } = body;
    try {
      const updated = await this.db
        .update(categories)
        .set({ name })
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .returning();

      if (updated.length === 0) {
        throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'Category updated successfully',
        data: updated,
      };
    } catch (error) {
      this.logger.error('updated failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(body: { id: string }, userId: string) {
    try {
      const deleted = await this.db
        .delete(categories)
        .where(and(eq(categories.id, body.id), eq(categories.userId, userId)))
        .returning();

      if (deleted.length === 0) {
        throw new HttpException({}, HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'deleted',
      };
    } catch (error) {
      this.logger.error('❌ Delete failed', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
