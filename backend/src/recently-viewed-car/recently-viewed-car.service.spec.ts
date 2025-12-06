import { Test, TestingModule } from '@nestjs/testing';
import { RecentlyViewedCarService } from './recently-viewed-car.service';

describe('RecentlyViewedCarService', () => {
  let service: RecentlyViewedCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecentlyViewedCarService],
    }).compile();

    service = module.get<RecentlyViewedCarService>(RecentlyViewedCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
