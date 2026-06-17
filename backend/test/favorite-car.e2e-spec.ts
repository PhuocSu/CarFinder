import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FavoriteCarController } from '../src/favorite-car/favorite-car.controller';
import { FavoriteCarService } from '../src/favorite-car/favorite-car.service';

describe('FavoriteCarController (e2e)', () => {
  let app: INestApplication;

  const favoriteCarService = {
    toggle: jest.fn(),
    getFavoriteList: jest.fn(),
  };

  const mockFavoriteCar = {
    id: 1,
    userId: 10,
    carId: 1,
    car: {
      id: 1,
      brandName: 'Hyundai',
      carRegNo: 'ABC-123',
      basePrice: 50000,
      subModel: {
        id: 1,
        subModelName: 'Sonata',
        model: {
          id: 1,
          modelName: 'Sonata',
        },
      },
    },
    createdAt: '2026-06-17T00:00:00.000Z',
    updatedAt: '2026-06-17T00:00:00.000Z',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteCarController],
      providers: [
        {
          provide: FavoriteCarService,
          useValue: favoriteCarService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use((req: any, res: any, next: any) => {
      req.user = {
        sub: 10,
        username: 'test-user',
        role: 'INDIVIDUAL',
      };
      next();
    });

    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('POST /favorite-cars/:carId', () => {
    it('should add car to favorite list', async () => {
      favoriteCarService.toggle.mockResolvedValue({
        status: 'added',
      });

      const response = await request(app.getHttpServer())
        .post('/favorite-cars/1')
        .expect(201);

      expect(response.body).toEqual({
        status: 'added',
      });

      expect(favoriteCarService.toggle).toHaveBeenCalledWith(10, '1');
    });

    it('should remove car from favorite list when it already exists', async () => {
      favoriteCarService.toggle.mockResolvedValue({
        status: 'removed',
      });

      const response = await request(app.getHttpServer())
        .post('/favorite-cars/1')
        .expect(201);

      expect(response.body).toEqual({
        status: 'removed',
      });

      expect(favoriteCarService.toggle).toHaveBeenCalledWith(10, '1');
    });
  });

  describe('GET /favorite-cars', () => {
    it('should return favorite list of current user', async () => {
      favoriteCarService.getFavoriteList.mockResolvedValue([mockFavoriteCar]);

      const response = await request(app.getHttpServer())
        .get('/favorite-cars')
        .expect(200);

      expect(response.body).toEqual([mockFavoriteCar]);
      expect(favoriteCarService.getFavoriteList).toHaveBeenCalledWith(10);
    });

    it('should return empty favorite list', async () => {
      favoriteCarService.getFavoriteList.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/favorite-cars')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(favoriteCarService.getFavoriteList).toHaveBeenCalledWith(10);
    });
  });
});