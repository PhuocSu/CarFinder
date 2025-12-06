import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecentlyViewedCarService } from './recently-viewed-car.service';
import { CreateRecentlyViewedCarDto } from './dto/create-recently-viewed-car.dto';
import { UpdateRecentlyViewedCarDto } from './dto/update-recently-viewed-car.dto';

@Controller('recently-viewed-car')
export class RecentlyViewedCarController {
  constructor(private readonly recentlyViewedCarService: RecentlyViewedCarService) {}

  @Post()
  create(@Body() createRecentlyViewedCarDto: CreateRecentlyViewedCarDto) {
    return this.recentlyViewedCarService.create(createRecentlyViewedCarDto);
  }

  @Get()
  findAll() {
    return this.recentlyViewedCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recentlyViewedCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecentlyViewedCarDto: UpdateRecentlyViewedCarDto) {
    return this.recentlyViewedCarService.update(+id, updateRecentlyViewedCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recentlyViewedCarService.remove(+id);
  }
}
