import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CarController } from '../src/car/car.controller';
import { CarService } from '../src/car/car.service';
import { FuelType } from '../src/car/enums/fuel-type.enum';
import { TransmissionType } from '../src/car/enums/transmission-type.enum';
import { VehicleBadge } from '../src/car/enums/vehicle-badge.enum';

describe('CarController (e2e)', () => {
    let app: INestApplication;

    const carService = {
        create: jest.fn(),
        findAll: jest.fn(),
        getTopFavoriteCars: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
    };

    const mockCar = {
        id: 1,
        carImage: ['https://example.com/car.jpg'],
        brandName: 'Hyundai',
        vehicleBadge: [VehicleBadge.GOOD_CONDITION],
        firstRegDate: '2024-01-01',
        fuelType: FuelType.GASOLINE,
        exteriorColor: 'Black',
        seatingCapacity: 5,
        manufacturerYear: 2024,
        mileage: 1000,
        engineDisplacement: '1999cc',
        interiorColor: 'Black',
        carRegNo: 'ABC-123',
        transmissionType: TransmissionType.AUTOMATIC,
        basePrice: 50000,
        discountPercent: 5,
        description: 'Test car',
        isAvailable: true,
        subModelId: 1,
    };

    const createCarDto = {
        carImage: ['https://example.com/car.jpg'],
        brandName: 'Hyundai',
        vehicleBadge: [VehicleBadge.GOOD_CONDITION],
        firstRegDate: '2024-01-01',
        fuelType: FuelType.GASOLINE,
        exteriorColor: 'Black',
        seatingCapacity: 5,
        manufacturerYear: 2024,
        mileage: 1000,
        engineDisplacement: '1999cc',
        interiorColor: 'Black',
        carRegNo: 'ABC-123',
        transmissionType: TransmissionType.AUTOMATIC,
        basePrice: 50000,
        discountPercent: 5,
        description: 'Test car',
        isAvailable: true,
        subModelId: 1,
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [CarController],
            providers: [
                {
                    provide: CarService,
                    useValue: carService,
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        );

        await app.init();
    });

    afterEach(async () => {
        if (app) {
            await app.close();
        }
    });

    describe('POST /car', () => {
        it('should create a car', async () => {
            carService.create.mockResolvedValue(mockCar);

            const response = await request(app.getHttpServer())
                .post('/car')
                .send(createCarDto)
                .expect(201);

            expect(response.body).toEqual(mockCar);
            expect(carService.create).toHaveBeenCalledWith(createCarDto);
        });

        it('should return 400 when required field is missing', async () => {
            const { brandName, ...invalidDto } = createCarDto;

            await request(app.getHttpServer())
                .post('/car')
                .send(invalidDto)
                .expect(400);
        });
    });

    describe('GET /car', () => {
        it('should return paginated cars', async () => {
            const result = {
                data: [mockCar],
                total: 1,
                page: 1,
                pageSize: 12,
                totalPages: 1,
            };

            carService.findAll.mockResolvedValue(result);

            const response = await request(app.getHttpServer())
                .get('/car')
                .expect(200);

            expect(response.body).toEqual(result);
            expect(carService.findAll).toHaveBeenCalledWith(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                1,
                12,
            );
        });

        it('should pass search, filter, sort, and pagination query to service', async () => {
            const result = {
                data: [mockCar],
                total: 1,
                page: 2,
                pageSize: 5,
                totalPages: 1,
            };

            carService.findAll.mockResolvedValue(result);

            await request(app.getHttpServer())
                .get('/car')
                .query({
                    search: 'hyundai',
                    badges: VehicleBadge.GOOD_CONDITION,
                    modelIds: '1,2',
                    subModelIds: '3,4',
                    yearMin: 2020,
                    yearMax: 2024,
                    priceMin: 10000,
                    priceMax: 60000,
                    mileageMin: 0,
                    mileageMax: 50000,
                    fuelTypes: FuelType.GASOLINE,
                    exColors: 'Black',
                    inColors: 'Black',
                    sortBy: 'price',
                    order: 'desc',
                    page: 2,
                    pageSize: 5,
                })
                .expect(200);

            expect(carService.findAll).toHaveBeenCalledWith(
                'hyundai',
                [VehicleBadge.GOOD_CONDITION],
                [1, 2],
                [3, 4],
                2020,
                2024,
                10000,
                60000,
                0,
                50000,
                [FuelType.GASOLINE],
                ['Black'],
                ['Black'],
                'price',
                'desc',
                2,
                5,
            );
        });
    });

    describe('GET /car/top', () => {
        it('should return top favorite cars', async () => {
            const result = [
                {
                    ...mockCar,
                    favoriteCount: 10,
                },
            ];

            carService.getTopFavoriteCars.mockResolvedValue(result);

            const response = await request(app.getHttpServer())
                .get('/car/top')
                .query({ limit: 5 })
                .expect(200);

            expect(response.body).toEqual(result);
            expect(carService.getTopFavoriteCars).toHaveBeenCalledWith(5);
        });

        it('should use default limit when limit query is missing', async () => {
            carService.getTopFavoriteCars.mockResolvedValue([]);

            await request(app.getHttpServer()).get('/car/top').expect(200);

            expect(carService.getTopFavoriteCars).toHaveBeenCalledWith(3);
        });
    });

    describe('GET /car/:id', () => {
        it('should return one car by id', async () => {
            carService.findOne.mockResolvedValue(mockCar);

            const response = await request(app.getHttpServer())
                .get('/car/1')
                .expect(200);

            expect(response.body).toEqual(mockCar);
            expect(carService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('DELETE /car/:id', () => {
        it('should delete one car by id', async () => {
            carService.remove.mockResolvedValue(mockCar);

            const response = await request(app.getHttpServer())
                .delete('/car/1')
                .expect(200);

            expect(response.body).toEqual(mockCar);
            expect(carService.remove).toHaveBeenCalledWith(1);
        });
    });
});