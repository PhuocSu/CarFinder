import { Module } from '@nestjs/common';
import { PurchaseContractService } from './purchase-contract.service';
import { PurchaseContractController } from './purchase-contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseContract } from './entities/purchase-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseContract])],
  controllers: [PurchaseContractController],
  providers: [PurchaseContractService],
})
export class PurchaseContractModule {}
