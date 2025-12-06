import { Test, TestingModule } from '@nestjs/testing';
import { CompareCarController } from './compare-car.controller';
import { CompareCarService } from './compare-car.service';

describe('CompareCarController', () => {
  let controller: CompareCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompareCarController],
      providers: [CompareCarService],
    }).compile();

    controller = module.get<CompareCarController>(CompareCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
