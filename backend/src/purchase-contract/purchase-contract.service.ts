import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseContractDto } from './dto/create-purchase-contract.dto';
import { UpdatePurchaseContractDto } from './dto/update-purchase-contract.dto';
import { DataSource, DeepPartial, LessThan } from 'typeorm';
import { ContractNumberCounter } from './entities/contract-number-counter.entity';
import { ContractStatus, PurchaseContract } from './entities/purchase-contract.entity';
import {
  getDateKey,
  buildContractNumber,
} from './helpers/format-date-purchase-contract';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

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

  async getContractsByBuyerId(buyerId: number): Promise<PurchaseContract[]> {
    return this.dataSource.getRepository(PurchaseContract).find({
      where: {
        buyer: { id: buyerId },
      },
      relations: [
        'car',
        'buyer',
        'saleperson',
        'payments',
        'car.subModel',
        'car.subModel.model',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getContractById(id: number): Promise<PurchaseContract> {
    const contract = await this.dataSource
      .getRepository(PurchaseContract)
      .findOne({
        where: { id },
        relations: [
          'car',
          'buyer',
          'saleperson',
          'payments',
          'car.subModel',
          'car.subModel.model',
        ],
      });

    if (!contract) throw new NotFoundException(`Not Found Contract #${id}`);

    return contract;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async autoCancelExpiredDraftContracts() {
    const expiredDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const expiredDraftContracts = await this.dataSource
      .getRepository(PurchaseContract)
      .find({
        where: {
          statusContract: ContractStatus.DRAFTED,
          createdAt: LessThan(expiredDate),
        },
      });

    if (!expiredDraftContracts.length) {
      return;
    }

    for (const contract of expiredDraftContracts) {
      contract.statusContract = ContractStatus.CANCELLED;
    }

    await this.dataSource
      .getRepository(PurchaseContract)
      .save(expiredDraftContracts);

    console.log(
      `[PurchaseContractCron] Auto-cancelled ${expiredDraftContracts.length} drafted contract(s) at ${new Date().toISOString()}`,
    );
  }
}
