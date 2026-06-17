import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ContractStatus } from '../src/purchase-contract/entities/purchase-contract.entity';
import { PurchaseContractController } from '../src/purchase-contract/purchase-contract.controller';
import { PurchaseContractService } from '../src/purchase-contract/purchase-contract.service';

describe('PurchaseContractController (e2e)', () => {
  let app: INestApplication;

  const purchaseContractService = {
    createContract: jest.fn(),
    getContractsByBuyerId: jest.fn(),
    getContractById: jest.fn(),
  };

  const createPurchaseContractDto = {
    carId: 1,
    buyerId: 10,
    salepersonId: 2,
    priceAtPurchase: 5000000,
    buyerName: 'Nguyen Van A',
    buyerEmail: 'buyer@example.com',
    buyerPhone: '0901234567',
    desiredDeliveryDate: '2026-06-30',
    signatureDigital: 'base64-signature',
    notes: 'Test contract',
  };

  const mockContract = {
    id: 1,
    contractNumber: '20260617-0001',
    priceAtPurchase: 5000000,
    buyerName: 'Nguyen Van A',
    buyerEmail: 'buyer@example.com',
    buyerPhone: '0901234567',
    desiredDeliveryDate: '2026-06-30',
    signatureDigital: 'base64-signature',
    notes: 'Test contract',
    statusContract: ContractStatus.DRAFTED,
    createdAt: '2026-06-17T00:00:00.000Z',
    car: {
      id: 1,
      brandName: 'Hyundai',
      carRegNo: 'ABC-123',
      subModel: {
        id: 1,
        subModelName: 'Sonata 2.0',
        model: {
          id: 1,
          modelName: 'Sonata',
        },
      },
    },
    buyer: {
      id: 10,
      custId: 'buyer01',
      custName: 'Nguyen Van A',
    },
    saleperson: {
      id: 2,
      custId: 'sale01',
      custName: 'Sale User',
    },
    payments: [],
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseContractController],
      providers: [
        {
          provide: PurchaseContractService,
          useValue: purchaseContractService,
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

  describe('POST /purchase-contract', () => {
    it('should create purchase contract', async () => {
      purchaseContractService.createContract.mockResolvedValue(mockContract);

      const response = await request(app.getHttpServer())
        .post('/purchase-contract')
        .send(createPurchaseContractDto)
        .expect(201);

      expect(response.body).toEqual(mockContract);
      expect(purchaseContractService.createContract).toHaveBeenCalledWith(
        createPurchaseContractDto,
      );
    });

    it('should return 400 when required field is missing', async () => {
      const { carId, ...invalidDto } = createPurchaseContractDto;

      await request(app.getHttpServer())
        .post('/purchase-contract')
        .send(invalidDto)
        .expect(400);
    });

    it('should return 400 when buyerEmail is invalid', async () => {
      await request(app.getHttpServer())
        .post('/purchase-contract')
        .send({
          ...createPurchaseContractDto,
          buyerEmail: 'invalid-email',
        })
        .expect(400);
    });
  });

  describe('GET /purchase-contract/buyer/:buyerId', () => {
    it('should return contracts by buyer id', async () => {
      purchaseContractService.getContractsByBuyerId.mockResolvedValue([
        mockContract,
      ]);

      const response = await request(app.getHttpServer())
        .get('/purchase-contract/buyer/10')
        .expect(200);

      expect(response.body).toEqual([mockContract]);
      expect(purchaseContractService.getContractsByBuyerId).toHaveBeenCalledWith(
        10,
      );
    });

    it('should return empty array when buyer has no contracts', async () => {
      purchaseContractService.getContractsByBuyerId.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/purchase-contract/buyer/999')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(purchaseContractService.getContractsByBuyerId).toHaveBeenCalledWith(
        999,
      );
    });
  });

  describe('GET /purchase-contract/:id', () => {
    it('should return one contract by id', async () => {
      purchaseContractService.getContractById.mockResolvedValue(mockContract);

      const response = await request(app.getHttpServer())
        .get('/purchase-contract/1')
        .expect(200);

      expect(response.body).toEqual(mockContract);
      expect(purchaseContractService.getContractById).toHaveBeenCalledWith(1);
    });

    it('should return 404 when contract does not exist', async () => {
      purchaseContractService.getContractById.mockRejectedValue(
        new NotFoundException('Not Found Contract #999'),
      );

      await request(app.getHttpServer())
        .get('/purchase-contract/999')
        .expect(404);

      expect(purchaseContractService.getContractById).toHaveBeenCalledWith(999);
    });
  });
});