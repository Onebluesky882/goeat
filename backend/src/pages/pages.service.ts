import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { pages, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CreatePageDto } from './pages.dto';

@Injectable()
export class PagesService {
  private readonly logger = new Logger(PagesService.name);
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
      return {
        success: true,
        message: 'Page created successfully',
        data: data,
      };
    } catch (error) {
      this.logger.error('Insert failed ', error);
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
      return { success: true, message: 'get all success', data: data };
    } catch (error) {
      this.logger.error('allPages failed ', error);
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
        throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
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

      if (updated.length === 0) {
        throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'page updated successfully',
        data: updated[0],
      };
    } catch (error) {
      this.logger.error('updated failed ', error.message);

      throw new HttpException(
        {
          success: false,
          message: 'Failed to update page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, userId: string) {
    try {
      const deleted = await this.db
        .delete(pages)
        .where(and(eq(pages.id, id), eq(pages.userId, userId)))
        .returning();

      if (deleted.length === 0) {
        this.logger.warn(
          `Page with ID "${id}" not found or unauthorized for user "${userId}"`,
        );
        throw new HttpException(
          {
            success: false,
            message:
              'Page not found or you do not have permission to delete it.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Page deleted successfully.',
      };
    } catch (error) {
      this.logger.error('❌ Delete failed', error.stack || error.message);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete page due to a server error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
