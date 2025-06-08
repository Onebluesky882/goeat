import { Test, TestingModule } from '@nestjs/testing';
import { LineUsersController } from './line_users.controller';

describe('LineUsersController', () => {
  let controller: LineUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineUsersController],
    }).compile();

    controller = module.get<LineUsersController>(LineUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
