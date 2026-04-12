import { Injectable } from '@nestjs/common';
import { CreatePurchaseContractDto } from './dto/create-purchase-contract.dto';
import { UpdatePurchaseContractDto } from './dto/update-purchase-contract.dto';

@Injectable()
export class PurchaseContractService {
  create(createPurchaseContractDto: CreatePurchaseContractDto) {
    return 'This action adds a new purchaseContract';
  }

  findAll() {
    return `This action returns all purchaseContract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseContract`;
  }

  update(id: number, updatePurchaseContractDto: UpdatePurchaseContractDto) {
    return `This action updates a #${id} purchaseContract`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseContract`;
  }
}
