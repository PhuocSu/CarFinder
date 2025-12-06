import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteCarService } from './favorite-car.service';
import { CreateFavoriteCarDto } from './dto/create-favorite-car.dto';
import { UpdateFavoriteCarDto } from './dto/update-favorite-car.dto';

@Controller('favorite-car')
export class FavoriteCarController {
  constructor(private readonly favoriteCarService: FavoriteCarService) {}

  @Post()
  create(@Body() createFavoriteCarDto: CreateFavoriteCarDto) {
    return this.favoriteCarService.create(createFavoriteCarDto);
  }

  @Get()
  findAll() {
    return this.favoriteCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteCarDto: UpdateFavoriteCarDto) {
    return this.favoriteCarService.update(+id, updateFavoriteCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteCarService.remove(+id);
  }
}
