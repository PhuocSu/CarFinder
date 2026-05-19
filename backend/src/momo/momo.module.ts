import { Module } from '@nestjs/common';
import { MomoService } from './momo.service';
import { MomoController } from './momo.controller';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  controllers: [MomoController],
  providers: [MomoService],
  imports: [PaymentsModule],

})
export class MomoModule {}
