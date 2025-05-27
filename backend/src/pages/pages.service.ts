import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { pages, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CreatePageDto } from './pages.dto';

@Injectable()
export class PagesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(body: CreatePageDto, userId: string) {
    try {
      const data = await this.db
        .insert(pages)
        .values({ ...body, userId })
        .returning();
      return { message: 'page created successfully', data: data };
    } catch (error) {
      console.error('Insert failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'fail to insert new page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async allPages(userId: string) {
    try {
      const data = await this.db
        .select({
          id: pages.id,
          name: pages.name,
          shopId: pages.shopId,
        })
        .from(pages)
        .innerJoin(shops, eq(pages.shopId, shops.id))
        .where(eq(pages.userId, userId));
      return { success: true, data: data };
    } catch (error) {
      console.error('allPages failed ', error);
      throw new HttpException(
        { success: false, message: 'Failed to fetch pages' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPageById(id: string, userId: string) {
    try {
      const data = await this.db
        .select({
          id: pages.id,
          name: pages.name,
          shopId: pages.shopId,
        })
        .from(pages)
        .where(and(eq(pages.id, id), eq(pages.userId, userId)));

      if (data.length === 0) {
        throw new HttpException('page not found', HttpStatus.NOT_FOUND);
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
          message: 'Failed to fetch page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(body: { id: string; name: string }, userId: string) {
    const { id, name } = body;
    try {
      const updated = await this.db
        .update(pages)
        .set({ name })
        .where(and(eq(pages.id, id), eq(pages.userId, userId)))
        .returning();
      return {
        success: true,
        message: 'page updated successfully',
        data: updated,
      };
    } catch (error) {
      console.error('updated failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(body: { id: string }, userId: string) {
    try {
      const deleted = await this.db
        .delete(pages)
        .where(and(eq(pages.id, body.id), eq(pages.userId, userId)))
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
