import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { and, eq } from 'drizzle-orm';
import { menus, schema } from 'src/database';
import { MenuDto } from './menus.dto';

@Injectable()
export class MenusService {
  private readonly logger = new Logger(MenusService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: MenuDto, shopId: string, userId) {
    try {
      const newMenu = await this.db
        .insert(menus)
        .values({ ...dto, shopId: shopId, createdBy: userId });
      return {
        success: true,
        data: newMenu,
      };
    } catch (error) {
      this.logger.error('Failed to create menu', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'menu already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the menu.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(shopId: string) {
    try {
      const result = await this.db
        .select({
          name: menus.name,
          price: menus.price,
          categoryId: menus.categoryId,
          available: menus.available,
          createdBy: menus.createdBy,
          description: menus.description,
          pageId: menus.pageId,
          imageId: menus.imageId,
          shopId: menus.shopId,
        })
        .from(menus)
        .where(eq(menus.shopId, shopId));

      return {
        success: true,
        message: 'Fetched all menus successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch menu',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, shopId: string) {
    try {
      const result = await this.db
        .select({
          name: menus.name,
          price: menus.price,
          categoryId: menus.categoryId,
          available: menus.available,
          createdBy: menus.createdBy,
          description: menus.description,
          pageId: menus.pageId,
          imageId: menus.imageId,
          shopId: menus.shopId,
        })
        .from(menus)
        .where(and(eq(menus.id, id), eq(menus.shopId, shopId)));
      return {
        data: result[0],
        success: true,
        message: 'Fetched menu by ID successfully',
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

  async update(id: string, body: MenuDto, shopId: string) {
    try {
      const updated = await this.db
        .update(menus)
        .set(body)
        .where(and(eq(menus.id, id), eq(menus.shopId, shopId)))
        .returning();
      return {
        data: updated,
        success: true,
        message: ' updated menu success ',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update menu ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string, shopId: string) {
    try {
      await this.db
        .delete(menus)
        .where(and(eq(menus.id, id), eq(menus.shopId, shopId)))
        .returning();
      return {
        success: true,
        message: 'menu deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete menu',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
