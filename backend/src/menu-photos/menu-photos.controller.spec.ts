import { Test, TestingModule } from '@nestjs/testing';
import { MenuPhotosController } from './menu-photos.controller';

describe('MenuPhotosController', () => {
  let controller: MenuPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuPhotosController],
    }).compile();

    controller = module.get<MenuPhotosController>(MenuPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
