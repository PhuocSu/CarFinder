import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCarController } from './favorite-car.controller';
import { FavoriteCarService } from './favorite-car.service';

describe('FavoriteCarController', () => {
  let controller: FavoriteCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteCarController],
      providers: [FavoriteCarService],
    }).compile();

    controller = module.get<FavoriteCarController>(FavoriteCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
