import { Test, TestingModule } from '@nestjs/testing';
import { RecentlySearchHistoryController } from './recently-search-history.controller';

describe('RecentlySearchHistoryController', () => {
  let controller: RecentlySearchHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecentlySearchHistoryController],
    }).compile();

    controller = module.get<RecentlySearchHistoryController>(RecentlySearchHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
