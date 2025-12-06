import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CompareCarService } from './compare-car.service';
import { CreateCompareCarDto } from './dto/create-compare-car.dto';
import { UpdateCompareCarDto } from './dto/update-compare-car.dto';

@Controller('compare-car')
export class CompareCarController {
  constructor(private readonly compareCarService: CompareCarService) {}

  @Post(':carId')
  addCarToCompareList(@Param('carId') carId: number, @Req() req: any) {
    return this.compareCarService.toggle(req.user.sub, carId);
  }

  @Get()
  getCompareList(@Req() req: any) {
    return this.compareCarService.getCompareList(req.user.sub);
  }
}
