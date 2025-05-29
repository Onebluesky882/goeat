import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { images, menus } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and, or } from 'drizzle-orm';
import { InsertImage, UpdateImage } from './images.dto';
import { ValidateService } from 'src/validate/validate.service';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly access: ValidateService,
  ) {}

  async create(dto: InsertImage, userId: string) {
    if (dto.shopId) {
      await this.access.validateShop(userId, dto.shopId);
    } else if (dto.menuId) {
      await this.access.validateMenu(userId, dto.menuId);
    } else {
      if (dto.userId != userId) {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    }

    try {
      const [inserted] = await this.db
        .insert(images)
        .values({ ...dto, userId })
        .returning();
      return {
        success: true,
        message: 'create Image successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create image', error.stack);
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'image already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the image.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(userId: string, shopId: string, menuId: string) {
    try {
      await this.access.validateShop(userId, shopId);

      if (menuId) {
        await this.access.validateMenu(userId, menuId);
      }
      const predicated = [eq(images.shopId, shopId), eq(images.userId, userId)];

      if (menuId) {
        predicated.push(eq(images.menuId, menuId));
      }
      const result = await this.db
        .select({
          type: images.type,
          imageName: images.imageName,
          imageUrl: images.imageUrl,
          createdAt: images.createdAt,
          shopId: images.shopId,
          menuId: images.menuId,
          userId: images.userId,
        })
        .from(images)
        .where(or(...predicated));

      return {
        success: true,
        message: 'Fetched all image successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch image',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, userId: string) {
    const [img] = await this.db
      .select({
        type: images.type,
        imageName: images.imageName,
        imageUrl: images.imageUrl,
        createdAt: images.createdAt,
        shopId: images.shopId,
        menuId: images.menuId,
        userId: images.userId,
      })
      .from(images)
      .where(eq(images.id, id));
    if (!img) {
      throw new HttpException('image not found', HttpStatus.NOT_FOUND);
    }

    await this.access.validateImage(id, userId);
    return {
      data: img[0],
      success: true,
      message: 'Fetched image by ID successfully',
    };
  }
  catch(error) {
    this.logger.error(error);
    throw new HttpException(
      {
        success: false,
        message: 'unable to fetch by id',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async update(id, dto: UpdateImage, userId: string) {
    try {
      await this.access.validateImage(id, userId);
      const [updated] = await this.db
        .update(images)
        .set(dto)
        .where(eq(images.id, id))
        .returning();
      if (!updated) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: updated,
        success: true,
        message: 'Image updated successfully',
      };
    } catch (error) {
      this.logger.error(`Failed to update image ${id}`, error.stack);
      throw new HttpException(
        { success: false, message: 'Failed to update image' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, userId: string) {
    await this.access.validateImage(id, userId);
    try {
      await this.db.delete(images).where(eq(images.id, id)).returning();

      return {
        success: true,
        message: 'image deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete image',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
