import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RecentlySearchHistoryService } from './recently-search-history.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('recently-search-history')
export class RecentlySearchHistoryController {
  constructor(
    private readonly recentlySearchHistoryService: RecentlySearchHistoryService,
  ) {}

  @Public()
  @Post()
  async saveRecentSearch(@Body() body: any) {
    return this.recentlySearchHistoryService.saveRecentSearch(
      body.userId,
      body.filters,
    );
  }

  @Public()
  @Get()
  async getRecentSearches(@Query() query: any) {
    return this.recentlySearchHistoryService.getRecentSearches(query.userId);
  }

  @Public()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRecentSearch(
    @Param('id') id: string, // <-- Dùng @Param để lấy :id từ URL
    @Query('userId') userId: string, // <-- @Query để lấy userId
  ) {
    return this.recentlySearchHistoryService.deleteRecentSearch(
      parseInt(id),
      parseInt(userId),
    );
  }
}
