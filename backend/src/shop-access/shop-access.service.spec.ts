import { Test, TestingModule } from '@nestjs/testing';
import { ShopAccessService } from './shop-access.service';

describe('ShopAccessService', () => {
  let service: ShopAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopAccessService],
    }).compile();

    service = module.get<ShopAccessService>(ShopAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
