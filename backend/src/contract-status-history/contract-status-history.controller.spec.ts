import { Test, TestingModule } from '@nestjs/testing';
import { ContractStatusHistoryController } from './contract-status-history.controller';
import { ContractStatusHistoryService } from './contract-status-history.service';

describe('ContractStatusHistoryController', () => {
  let controller: ContractStatusHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractStatusHistoryController],
      providers: [ContractStatusHistoryService],
    }).compile();

    controller = module.get<ContractStatusHistoryController>(ContractStatusHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
