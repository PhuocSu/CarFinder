import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractStatusHistoryService } from './contract-status-history.service';
import { CreateContractStatusHistoryDto } from './dto/create-contract-status-history.dto';
import { UpdateContractStatusHistoryDto } from './dto/update-contract-status-history.dto';

@Controller('contract-status-history')
export class ContractStatusHistoryController {
  constructor(private readonly contractStatusHistoryService: ContractStatusHistoryService) {}

  @Post()
  create(@Body() createContractStatusHistoryDto: CreateContractStatusHistoryDto) {
    return this.contractStatusHistoryService.create(createContractStatusHistoryDto);
  }

  @Get()
  findAll() {
    return this.contractStatusHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractStatusHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractStatusHistoryDto: UpdateContractStatusHistoryDto) {
    return this.contractStatusHistoryService.update(+id, updateContractStatusHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractStatusHistoryService.remove(+id);
  }
}
