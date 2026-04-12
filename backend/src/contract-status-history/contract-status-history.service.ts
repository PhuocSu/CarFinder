import { Injectable } from '@nestjs/common';
import { CreateContractStatusHistoryDto } from './dto/create-contract-status-history.dto';
import { UpdateContractStatusHistoryDto } from './dto/update-contract-status-history.dto';

@Injectable()
export class ContractStatusHistoryService {
  create(createContractStatusHistoryDto: CreateContractStatusHistoryDto) {
    return 'This action adds a new contractStatusHistory';
  }

  findAll() {
    return `This action returns all contractStatusHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contractStatusHistory`;
  }

  update(id: number, updateContractStatusHistoryDto: UpdateContractStatusHistoryDto) {
    return `This action updates a #${id} contractStatusHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} contractStatusHistory`;
  }
}
