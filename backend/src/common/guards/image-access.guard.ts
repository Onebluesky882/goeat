import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidateService } from 'src/common/validate/validate.service';

@Injectable()
export class ImageAccessGuard implements CanActivate {
  constructor(private readonly validate: ValidateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    // 1) Figure out the imageId parameter (from route or body)
    const imageId = req.params['id'] ?? req.body?.id;
    if (!imageId) {
      throw new NotFoundException('Image ID not provided');
    }
    await this.validate.validateImage(imageId, user.id);
    return true;
  }
}
