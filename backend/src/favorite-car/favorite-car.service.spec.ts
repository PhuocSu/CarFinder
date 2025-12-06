import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCarService } from './favorite-car.service';

describe('FavoriteCarService', () => {
  let service: FavoriteCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteCarService],
    }).compile();

    service = module.get<FavoriteCarService>(FavoriteCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
