import { Test, TestingModule } from '@nestjs/testing';
import { CompareCarService } from './compare-car.service';

describe('CompareCarService', () => {
  let service: CompareCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompareCarService],
    }).compile();

    service = module.get<CompareCarService>(CompareCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
