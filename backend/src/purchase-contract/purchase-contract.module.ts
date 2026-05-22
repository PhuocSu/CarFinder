import { Module } from '@nestjs/common';
import { PurchaseContractService } from './purchase-contract.service';
import { PurchaseContractController } from './purchase-contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseContract } from './entities/purchase-contract.entity';
import { ContractNumberCounter } from './entities/contract-number-counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseContract, ContractNumberCounter])],
  controllers: [PurchaseContractController],
  providers: [PurchaseContractService],
})
export class PurchaseContractModule {}
