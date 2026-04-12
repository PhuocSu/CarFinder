import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseContractController } from './purchase-contract.controller';
import { PurchaseContractService } from './purchase-contract.service';

describe('PurchaseContractController', () => {
  let controller: PurchaseContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseContractController],
      providers: [PurchaseContractService],
    }).compile();

    controller = module.get<PurchaseContractController>(PurchaseContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
