import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { categories, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CreateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
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
      return { message: 'Category created successfully', data: data };
    } catch (error) {
      console.error('Insert failed ', error);
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
      return { success: true, data: data };
    } catch (error) {
      console.error('all categories failed ', error);
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
          id: categories.id,
          name: categories.name,
          shopId: categories.shopId,
        })
        .from(categories)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)));

      if (data.length === 0) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        data: data[0],
      };
    } catch (error) {
      console.error('Fetch failed', error);
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
      return {
        success: true,
        message: 'Category updated successfully',
        data: updated,
      };
    } catch (error) {
      console.error('updated failed ', error);
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
      console.error('❌ Delete failed', error);
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
