import { Test, TestingModule } from '@nestjs/testing';
import { SubModelController } from './sub-model.controller';
import { SubModelService } from './sub-model.service';

describe('SubModelController', () => {
  let controller: SubModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubModelController],
      providers: [SubModelService],
    }).compile();

    controller = module.get<SubModelController>(SubModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
