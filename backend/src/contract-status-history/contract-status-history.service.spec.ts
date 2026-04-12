import { Test, TestingModule } from '@nestjs/testing';
import { ContractStatusHistoryService } from './contract-status-history.service';

describe('ContractStatusHistoryService', () => {
  let service: ContractStatusHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractStatusHistoryService],
    }).compile();

    service = module.get<ContractStatusHistoryService>(ContractStatusHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
