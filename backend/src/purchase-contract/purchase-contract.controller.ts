import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PurchaseContractService } from './purchase-contract.service';
import { CreatePurchaseContractDto } from './dto/create-purchase-contract.dto';
import { UpdatePurchaseContractDto } from './dto/update-purchase-contract.dto';

@Controller('purchase-contract')
export class PurchaseContractController {
  constructor(private readonly purchaseContractService: PurchaseContractService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePurchaseContractDto) {
    return this.purchaseContractService.createContract(dto);
  }

  @Get('buyer/:buyerId')
  async findByBuyer(@Param('buyerId') buyerId: string) {
    return this.purchaseContractService.getContractsByBuyerId(Number(buyerId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.purchaseContractService.getContractById(Number(id));
  }
}
