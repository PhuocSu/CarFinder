import { Test, TestingModule } from '@nestjs/testing';
import { RecentlySearchHistoryService } from './recently-search-history.service';

describe('RecentlySearchHistoryService', () => {
  let service: RecentlySearchHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecentlySearchHistoryService],
    }).compile();

    service = module.get<RecentlySearchHistoryService>(RecentlySearchHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
