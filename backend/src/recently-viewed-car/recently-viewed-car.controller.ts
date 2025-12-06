import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RecentlyViewedCarService } from './recently-viewed-car.service';
import { CreateRecentlyViewedCarDto } from './dto/create-recently-viewed-car.dto';
import { UpdateRecentlyViewedCarDto } from './dto/update-recently-viewed-car.dto';

@Controller('recently-viewed-car')
export class RecentlyViewedCarController {
  constructor(private readonly recentlyViewedCarService: RecentlyViewedCarService) {}

  @Post(":carId")
  addCarToRecentlyViewed(@Param('carId') carId: number, @Req() req: any) {
    return this.recentlyViewedCarService.toggle(req.user.sub, carId);
  }

  @Get()
  getRecentlyViewedCars(@Req() req: any) {
    return this.recentlyViewedCarService.getRecentlyViewedCars(req.user.sub);
  }
}
