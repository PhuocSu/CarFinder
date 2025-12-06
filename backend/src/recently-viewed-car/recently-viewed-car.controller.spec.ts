import { Test, TestingModule } from '@nestjs/testing';
import { RecentlyViewedCarController } from './recently-viewed-car.controller';
import { RecentlyViewedCarService } from './recently-viewed-car.service';

describe('RecentlyViewedCarController', () => {
  let controller: RecentlyViewedCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecentlyViewedCarController],
      providers: [RecentlyViewedCarService],
    }).compile();

    controller = module.get<RecentlyViewedCarController>(RecentlyViewedCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
