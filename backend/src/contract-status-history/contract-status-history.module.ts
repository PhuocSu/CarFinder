import { Module } from '@nestjs/common';
import { ContractStatusHistoryService } from './contract-status-history.service';
import { ContractStatusHistoryController } from './contract-status-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractStatusHistory } from './entities/contract-status-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractStatusHistory])],
  controllers: [ContractStatusHistoryController],
  providers: [ContractStatusHistoryService],
})
export class ContractStatusHistoryModule {}
