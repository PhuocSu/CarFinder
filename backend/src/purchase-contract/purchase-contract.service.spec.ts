import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseContractService } from './purchase-contract.service';

describe('PurchaseContractService', () => {
  let service: PurchaseContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseContractService],
    }).compile();

    service = module.get<PurchaseContractService>(PurchaseContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
