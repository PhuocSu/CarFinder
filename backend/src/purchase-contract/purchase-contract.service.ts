import { Injectable } from '@nestjs/common';
import { CreatePurchaseContractDto } from './dto/create-purchase-contract.dto';
import { UpdatePurchaseContractDto } from './dto/update-purchase-contract.dto';
import { DataSource } from 'typeorm';
import { ContractNumberCounter } from './entities/contract-number-counter.entity';
import { PurchaseContract } from './entities/purchase-contract.entity';
import {
  getDateKey,
  buildContractNumber,
} from './helpers/format-date-purchase-contract';

@Injectable()
export class PurchaseContractService {
  constructor(private readonly dataSource: DataSource) {}

  async createContract(dto: any) {
    return this.dataSource.transaction(async (manager) => {
      const dateKey = getDateKey();

      // ✅ Thử tìm với lock ngay từ đầu
      let counter = await manager.findOne(ContractNumberCounter, {
        where: { dateKey },
        lock: { mode: 'pessimistic_write' }, //
      });

      // ✅ Nếu chưa có thì tạo mới
      if (!counter) {
        counter = manager.create(ContractNumberCounter, {
          dateKey,
          lastSequence: 0,
        });
        await manager.save(counter);
      }

      // ✅ Tăng sequence và lưu
      counter.lastSequence += 1;
      await manager.save(counter);

      const contractNumber = buildContractNumber(dateKey, counter.lastSequence);

      const contract = manager.create(PurchaseContract, {
        ...dto,
        contractNumber,
      });

      return await manager.save(contract);
    });
  }
}
