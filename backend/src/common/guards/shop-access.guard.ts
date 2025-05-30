import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ValidateService } from '../validate/validate.service';
import { Request } from 'express';
@Injectable()
export class ShopAccessGuard implements CanActivate {
  constructor(private validateService: ValidateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { id: string };

    if (!user || !user.id) {
      throw new ForbiddenException('Missing user or shopId');
    }

    const shopId = request.params.shopId || request.body?.shopId;
    if (!shopId) {
      throw new ForbiddenException('Shop ID not provided.');
    }

    await this.validateService.validateShop(shopId, user.id, ['staff']);

    return true;
  }
}
