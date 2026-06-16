import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CompareCarController } from '../src/compare-car/compare-car.controller';
import { CompareCarService } from '../src/compare-car/compare-car.service';

describe('CompareCarController (e2e)', () => {
  let app: INestApplication;

  const compareCarService = {
    toggle: jest.fn(),
    getCompareList: jest.fn(),
  };

  const mockCompareCar = {
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
      controllers: [CompareCarController],
      providers: [
        {
          provide: CompareCarService,
          useValue: compareCarService,
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

  describe('POST /compare-cars/:carId', () => {
    it('should add car to compare list', async () => {
      compareCarService.toggle.mockResolvedValue({
        status: 'added',
      });

      const response = await request(app.getHttpServer())
        .post('/compare-cars/1')
        .expect(201);

      expect(response.body).toEqual({
        status: 'added',
      });

      expect(compareCarService.toggle).toHaveBeenCalledWith(10, '1');
    });

    it('should remove car from compare list when it already exists', async () => {
      compareCarService.toggle.mockResolvedValue({
        status: 'removed',
      });

      const response = await request(app.getHttpServer())
        .post('/compare-cars/1')
        .expect(201);

      expect(response.body).toEqual({
        status: 'removed',
      });

      expect(compareCarService.toggle).toHaveBeenCalledWith(10, '1');
    });

    it('should return error status when compare list already has 3 cars', async () => {
      compareCarService.toggle.mockResolvedValue({
        status: 'error',
        message: 'You can only compare up to 3 cars at a time',
      });

      const response = await request(app.getHttpServer())
        .post('/compare-cars/4')
        .expect(201);

      expect(response.body).toEqual({
        status: 'error',
        message: 'You can only compare up to 3 cars at a time',
      });

      expect(compareCarService.toggle).toHaveBeenCalledWith(10, '4');
    });
  });

  describe('GET /compare-cars', () => {
    it('should return compare list of current user', async () => {
      compareCarService.getCompareList.mockResolvedValue([mockCompareCar]);

      const response = await request(app.getHttpServer())
        .get('/compare-cars')
        .expect(200);

      expect(response.body).toEqual([mockCompareCar]);
      expect(compareCarService.getCompareList).toHaveBeenCalledWith(10);
    });

    it('should return empty compare list', async () => {
      compareCarService.getCompareList.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/compare-cars')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(compareCarService.getCompareList).toHaveBeenCalledWith(10);
    });
  });
});