import { Test, TestingModule } from '@nestjs/testing';
import { SubModelService } from './sub-model.service';

describe('SubModelService', () => {
  let service: SubModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubModelService],
    }).compile();

    service = module.get<SubModelService>(SubModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
