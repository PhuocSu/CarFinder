import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { RecentlyViewedCarController } from '../src/recently-viewed-car/recently-viewed-car.controller';
import { RecentlyViewedCarService } from '../src/recently-viewed-car/recently-viewed-car.service';

describe('RecentlyViewedCarController (e2e)', () => {
  let app: INestApplication;

  const recentlyViewedCarService = {
    trackView: jest.fn(),
    getRecentlyViewedCars: jest.fn(),
  };

  const mockRecentlyViewedCar = {
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
        subModelName: 'Sonata 2.0',
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
      controllers: [RecentlyViewedCarController],
      providers: [
        {
          provide: RecentlyViewedCarService,
          useValue: recentlyViewedCarService,
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

  describe('POST /recently-viewed-car/:carId', () => {
    it('should add car to recently viewed list', async () => {
      recentlyViewedCarService.trackView.mockResolvedValue({
        status: 'added',
      });

      const response = await request(app.getHttpServer())
        .post('/recently-viewed-car/1')
        .expect(201);

      expect(response.body).toEqual({
        status: 'added',
      });

      expect(recentlyViewedCarService.trackView).toHaveBeenCalledWith(10, '1');
    });

    it('should update recently viewed time when car already exists', async () => {
      recentlyViewedCarService.trackView.mockResolvedValue({
        status: 'updated',
      });

      const response = await request(app.getHttpServer())
        .post('/recently-viewed-car/1')
        .expect(201);

      expect(response.body).toEqual({
        status: 'updated',
      });

      expect(recentlyViewedCarService.trackView).toHaveBeenCalledWith(10, '1');
    });
  });

  describe('GET /recently-viewed-car', () => {
    it('should return recently viewed cars of current user', async () => {
      recentlyViewedCarService.getRecentlyViewedCars.mockResolvedValue([
        mockRecentlyViewedCar,
      ]);

      const response = await request(app.getHttpServer())
        .get('/recently-viewed-car')
        .expect(200);

      expect(response.body).toEqual([mockRecentlyViewedCar]);

      expect(
        recentlyViewedCarService.getRecentlyViewedCars,
      ).toHaveBeenCalledWith(10);
    });

    it('should return empty recently viewed list', async () => {
      recentlyViewedCarService.getRecentlyViewedCars.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/recently-viewed-car')
        .expect(200);

      expect(response.body).toEqual([]);

      expect(
        recentlyViewedCarService.getRecentlyViewedCars,
      ).toHaveBeenCalledWith(10);
    });
  });
});