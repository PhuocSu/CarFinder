import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecentSearchHistory } from './entity/recently-search-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecentlySearchHistoryService {
  @InjectRepository(RecentSearchHistory)
  private recentSearchHistoryRepository: Repository<RecentSearchHistory>;

  async saveRecentSearch(userId: number, filters: any) {
    return this.recentSearchHistoryRepository.save({
      user: { id: userId },
      filters,
    });
  }

  async getRecentSearches(userId: number) {
    return this.recentSearchHistoryRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  async deleteRecentSearch(id: number, userId: number) {
    return this.recentSearchHistoryRepository.delete({
      id,
      user: { id: userId },
    });
  }

}
