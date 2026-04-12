import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseContractService } from './purchase-contract.service';
import { CreatePurchaseContractDto } from './dto/create-purchase-contract.dto';
import { UpdatePurchaseContractDto } from './dto/update-purchase-contract.dto';

@Controller('purchase-contract')
export class PurchaseContractController {
  constructor(private readonly purchaseContractService: PurchaseContractService) {}

  @Post()
  create(@Body() createPurchaseContractDto: CreatePurchaseContractDto) {
    return this.purchaseContractService.create(createPurchaseContractDto);
  }

  @Get()
  findAll() {
    return this.purchaseContractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseContractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseContractDto: UpdatePurchaseContractDto) {
    return this.purchaseContractService.update(+id, updatePurchaseContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseContractService.remove(+id);
  }
}
