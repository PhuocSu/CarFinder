import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { PurchaseContract } from 'src/purchase-contract/entities/purchase-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PurchaseContract])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService], //For Momo
})
export class PaymentsModule {}
