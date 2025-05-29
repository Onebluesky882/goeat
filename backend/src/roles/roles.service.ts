import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { roles } from '../database/schema/roles';
import { Roles } from './roles.dto';
import { ShopAccessService } from 'src/shop-access/shop-access.service';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly shopAccess: ShopAccessService,
  ) {}

  async create(newRoles: Roles, userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, ['owner', 'manager']);
      const inserted = await this.db.insert(roles).values(newRoles).returning();
      return {
        success: true,
        message: 'Role created successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create role', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'role already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the role.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, ['owner', 'manager']);
      const result = await this.db
        .select()
        .from(roles)
        .where(eq(roles.shopId, shopId));

      return {
        success: true,
        message: 'Fetched all roles successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch roles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, shopId: string, userId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, ['owner', 'manager']);
      const result = await this.db
        .select({ id: roles.id })
        .from(roles)
        .where(eq(roles.id, id));
      return {
        data: result[0],
        success: true,
        message: 'Fetched roles by ID successfully',
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

  async update(id: string, body: Roles, userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, ['owner', 'manager']);
      const { name } = body;
      const updated = await this.db
        .update(roles)
        .set({ name })
        .where(eq(roles.id, id))
        .returning();
      return {
        data: updated,
        success: true,
        message: 'Role updated successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update role',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string, userId: string, shopId: string) {
    try {
      await this.shopAccess.validateShop(shopId, userId, ['owner', 'manager']);
      await this.db.delete(roles).where(eq(roles.id, id));
      return {
        success: true,
        message: 'role deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete role',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
