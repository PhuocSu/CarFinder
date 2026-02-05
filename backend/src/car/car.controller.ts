import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('badges', new ParseArrayPipe({ items: String, optional: true })) //ParseArrayPipe: chuyển đổi tham số query có dấu phẩy thành Mảng
    badges?: string[],
    @Query('modelIds') modelIds?: string,
    @Query('subModelIds') subModelIds?: string,
    @Query('yearMin') yearMin?: number,
    @Query('yearMax') yearMax?: number,
    @Query('priceMin') priceMin?: number,
    @Query('priceMax') priceMax?: number,
    @Query('mileageMin') mileageMin?: number,
    @Query('mileageMax') mileageMax?: number,
    @Query('fuelTypes', new ParseArrayPipe({ items: String, optional: true }))
    fuelTypes?: string[],
    @Query('exColors', new ParseArrayPipe({ items: String, optional: true }))
    exColors?: string[],
    @Query('inColors', new ParseArrayPipe({ items: String, optional: true }))
    inColors?: string[],

    @Query('sortBy') sortBy?: 'price' | 'year' | 'mileage',
    @Query('order') order?: 'asc' | 'desc',
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 12,
  ) {
    return this.carService.findAll(
      search,
      badges,
      modelIds?.split(',').map(Number),
      subModelIds?.split(',').map(Number),
      yearMin,
      yearMax,
      priceMin,
      priceMax,
      mileageMin,
      mileageMax,
      fuelTypes,
      exColors,
      inColors,
      sortBy,
      order,
      Number(page),
      Number(pageSize),
    );
  }

  @Public()
  @Get('top')
  getTopFavoriteCars(
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number,
  ) {
    return this.carService.getTopFavoriteCars(limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Get('search')
  searchByCarRegNo_ModelName_SubModel_BrandName(
    @Query('search') search?: string,
  ) {
    return this.carService.findAll(search);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
