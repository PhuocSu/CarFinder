import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentlySearchHistoryController } from './recently-search-history.controller';
import { RecentlySearchHistoryService } from './recently-search-history.service';
import { RecentSearchHistory } from './entity/recently-search-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecentSearchHistory])],
  controllers: [RecentlySearchHistoryController],
  providers: [RecentlySearchHistoryService],
  exports: [RecentlySearchHistoryService],
})
export class RecentlySearchHistoryModule {}