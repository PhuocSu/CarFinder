import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { RecentlySearchHistoryController } from '../src/recently-search-history/recently-search-history.controller';
import { RecentlySearchHistoryService } from '../src/recently-search-history/recently-search-history.service';

describe('RecentlySearchHistoryController (e2e)', () => {
  let app: INestApplication;

  const recentlySearchHistoryService = {
    saveRecentSearch: jest.fn(),
    getRecentSearches: jest.fn(),
    deleteRecentSearch: jest.fn(),
  };

  const filters = {
    search: 'hyundai',
    modelIds: [1, 2],
    priceMin: 10000,
    priceMax: 60000,
    fuelTypes: ['가솔린'],
  };

  const mockRecentSearch = {
    id: 1,
    filters,
    user: {
      id: 10,
      custId: 'test-user',
      custName: 'Test User',
    },
    createdAt: '2026-06-17T00:00:00.000Z',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RecentlySearchHistoryController],
      providers: [
        {
          provide: RecentlySearchHistoryService,
          useValue: recentlySearchHistoryService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('POST /recently-search-history', () => {
    it('should save recent search', async () => {
      recentlySearchHistoryService.saveRecentSearch.mockResolvedValue(
        mockRecentSearch,
      );

      const response = await request(app.getHttpServer())
        .post('/recently-search-history')
        .send({
          userId: 10,
          filters,
        })
        .expect(201);

      expect(response.body).toEqual(mockRecentSearch);
      expect(recentlySearchHistoryService.saveRecentSearch).toHaveBeenCalledWith(
        10,
        filters,
      );
    });
  });

  describe('GET /recently-search-history', () => {
    it('should return recent searches by user id', async () => {
      recentlySearchHistoryService.getRecentSearches.mockResolvedValue([
        mockRecentSearch,
      ]);

      const response = await request(app.getHttpServer())
        .get('/recently-search-history')
        .query({
          userId: 10,
        })
        .expect(200);

      expect(response.body).toEqual([mockRecentSearch]);
      expect(recentlySearchHistoryService.getRecentSearches).toHaveBeenCalledWith(
        '10',
      );
    });

    it('should return empty recent search list', async () => {
      recentlySearchHistoryService.getRecentSearches.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/recently-search-history')
        .query({
          userId: 999,
        })
        .expect(200);

      expect(response.body).toEqual([]);
      expect(recentlySearchHistoryService.getRecentSearches).toHaveBeenCalledWith(
        '999',
      );
    });
  });

  describe('DELETE /recently-search-history/:id', () => {
    it('should delete recent search by id and user id', async () => {
      recentlySearchHistoryService.deleteRecentSearch.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/recently-search-history/1')
        .query({
          userId: 10,
        })
        .expect(204);

      expect(
        recentlySearchHistoryService.deleteRecentSearch,
      ).toHaveBeenCalledWith(1, 10);
    });
  });
});