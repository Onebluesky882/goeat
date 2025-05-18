import { Test, TestingModule } from '@nestjs/testing';
import { MenuPhotosService } from './menu-photos.service';

describe('MenuPhotosService', () => {
  let service: MenuPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuPhotosService],
    }).compile();

    service = module.get<MenuPhotosService>(MenuPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
