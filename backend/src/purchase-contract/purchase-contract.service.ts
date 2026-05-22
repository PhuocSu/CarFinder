import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseContractDto } from './dto/create-purchase-contract.dto';
import { UpdatePurchaseContractDto } from './dto/update-purchase-contract.dto';
import { DataSource, DeepPartial } from 'typeorm';
import { ContractNumberCounter } from './entities/contract-number-counter.entity';
import { PurchaseContract } from './entities/purchase-contract.entity';
import {
  getDateKey,
  buildContractNumber,
} from './helpers/format-date-purchase-contract';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PurchaseContractService {
  constructor(private readonly dataSource: DataSource) {}

  async createContract(dto: CreatePurchaseContractDto) {
    return this.dataSource.transaction(async (manager) => {
      const dateKey = getDateKey();

      // ✅ Thử tìm với lock ngay từ đầu
      let counter = await manager.findOne(ContractNumberCounter, {
        where: { dateKey },
        lock: { mode: 'pessimistic_write' }, //các transaction khác không thể đọc/ghi bản ghi
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
        car: { id: dto.carId } as Car, // ✅ cast type
        buyer: { id: dto.buyerId } as User,
        saleperson: dto.salepersonId
          ? ({ id: dto.salepersonId } as User)
          : null,
        priceAtPurchase: dto.priceAtPurchase,
        buyerName: dto.buyerName,
        buyerEmail: dto.buyerEmail,
        buyerPhone: dto.buyerPhone,
        desiredDeliveryDate: dto.desiredDeliveryDate ?? null,
        signatureDigital: dto.signatureDigital ?? null,
        notes: dto.notes ?? null,
        contractNumber,
      } as DeepPartial<PurchaseContract>); // ✅ cast toàn bộ object

      return await manager.save(contract);
    });
  }

  async getContractById(id: number): Promise<PurchaseContract> {
    const contract = await this.dataSource.getRepository(PurchaseContract).findOne({
      where: { id },
      relations: ['car', 'buyer', 'saleperson', 'payments'],
    });

    if (!contract) throw new NotFoundException(`Not Found Contract #${id}`);

    return contract;
  }
}
