import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PaymentsController } from '../src/payments/payments.controller';
import { PaymentMethod, PaymentStatus, PaymentType } from '../src/payments/entities/payment.entity';
import { PaymentsService } from '../src/payments/payments.service';

describe('PaymentsController (e2e)', () => {
  let app: INestApplication;

  const paymentsService = {
    findByContractId: jest.fn(),
  };

  const mockPayments = [
    {
      id: 1,
      contractId: 10,
      amount: 500000,
      paymentType: PaymentType.DEPOSIT,
      paymentMethod: PaymentMethod.MOMO,
      statusPayment: PaymentStatus.SUCCESS,
      orderId: '1-123456-abcdef',
      transactionRef: 'trans-001',
      paidAt: '2026-06-17T00:00:00.000Z',
      createdAt: '2026-06-17T00:00:00.000Z',
      contract: {
        id: 10,
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
      },
    },
    {
      id: 2,
      contractId: 10,
      amount: 4500000,
      paymentType: PaymentType.FINAL,
      paymentMethod: PaymentMethod.MOMO,
      statusPayment: PaymentStatus.PENDING,
      orderId: '2-123456-ghijkl',
      transactionRef: null,
      paidAt: null,
      createdAt: '2026-06-17T00:00:00.000Z',
      contract: {
        id: 10,
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
      },
    },
  ];

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: paymentsService,
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

  describe('GET /payments/view', () => {
    it('should return payments by contract id', async () => {
      paymentsService.findByContractId.mockResolvedValue(mockPayments);

      const response = await request(app.getHttpServer())
        .get('/payments/view')
        .query({
          contractId: 10,
        })
        .expect(200);

      expect(response.body).toEqual({
        payments: mockPayments,
      });

      expect(paymentsService.findByContractId).toHaveBeenCalledWith(10);
    });

    it('should convert contractId query to number before calling service', async () => {
      paymentsService.findByContractId.mockResolvedValue([]);

      await request(app.getHttpServer())
        .get('/payments/view')
        .query({
          contractId: '99',
        })
        .expect(200);

      expect(paymentsService.findByContractId).toHaveBeenCalledWith(99);
    });

    it('should return 404 when payments are not found', async () => {
      paymentsService.findByContractId.mockRejectedValue(
        new NotFoundException('Payment not found'),
      );

      await request(app.getHttpServer())
        .get('/payments/view')
        .query({
          contractId: 999,
        })
        .expect(404);

      expect(paymentsService.findByContractId).toHaveBeenCalledWith(999);
    });
  });
});