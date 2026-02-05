import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { FavoriteCarService } from './favorite-car.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('favorite-cars')
export class FavoriteCarController {
  constructor(private readonly favoriteCarService: FavoriteCarService) { }

  @Post(":carId")
  addCarToFavoriteList(@Req() req: any, @Param('carId') carId: number) {
    return this.favoriteCarService.toggle(req.user.sub, carId);
  }

  @Get()
  getFavoriteList(@Req() req: any) {
    return this.favoriteCarService.getFavoriteList(req.user.sub);
  }
}
