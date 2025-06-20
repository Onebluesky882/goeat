import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { images } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { ValidateService } from 'src/common/validate/validate.service';
import { ImageDto } from './images.dto';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async saveImageToDb(
    dto: ImageDto,
    file: Express.Multer.File,
    uploadedUrl: string,
    userId: string,
  ) {
    try {
      const inserted = await this.db
        .insert(images)
        .values({
          ...dto,
          imageName: file.originalname,
          imageUrl: uploadedUrl,
          userId,
        })
        .returning();
      return {
        success: true,
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
      const predicates = [eq(images.shopId, shopId), eq(images.userId, userId)];
      if (menuId) predicates.push(eq(images.menuId, menuId));
      const result = await this.db
        .select()
        .from(images)
        .where(and(...predicates));
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

  async getById(id: string) {
    const img = await this.db.select().from(images).where(eq(images.id, id));
    if (!img) throw new NotFoundException();
    return {
      data: img,
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

  async update(id, dto: ImageDto) {
    try {
      const updated = await this.db
        .update(images)
        .set(dto)
        .where(eq(images.id, id))
        .returning();
      if (!updated) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: updated[0],
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

  async delete(id: string) {
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
