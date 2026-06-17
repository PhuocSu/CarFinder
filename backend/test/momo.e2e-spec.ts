import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MomoController } from '../src/momo/momo.controller';
import { MomoService } from '../src/momo/momo.service';
import { PaymentStatus, PaymentType } from '../src/payments/entities/payment.entity';
import { PaymentsService } from '../src/payments/payments.service';

describe('MomoController (e2e)', () => {
  let app: INestApplication;

  const momoService = {
    createPayment: jest.fn(),
    verifyCallback: jest.fn(),
  };

  const paymentsService = {
    createDepositPending: jest.fn(),
    createFinalPending: jest.fn(),
    createRetryPaymentByOrderId: jest.fn(),
    saveOrderId: jest.fn(),
    updateByTransaction: jest.fn(),
  };

  const createMomoDto = {
    contractId: 1,
    amount: 500000,
  };

  const mockPayment = {
    id: 10,
    contractId: 1,
    amount: 500000,
    paymentType: PaymentType.DEPOSIT,
    statusPayment: PaymentStatus.PENDING,
  };

  const mockMomoResponse = {
    partnerCode: 'MOMO',
    orderId: '10-123456-abcdef',
    requestId: 'MOMO123456',
    amount: '500000',
    responseTime: 1718582400000,
    message: 'Successful.',
    resultCode: 0,
    payUrl: 'https://test-payment.momo.vn/pay',
    deeplink: 'momo://pay',
    qrCodeUrl: 'https://test-payment.momo.vn/qr',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MomoController],
      providers: [
        {
          provide: MomoService,
          useValue: momoService,
        },
        {
          provide: PaymentsService,
          useValue: paymentsService,
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

  describe('POST /momo/create', () => {
    it('should create deposit payment and return momo payment url', async () => {
      paymentsService.createDepositPending.mockResolvedValue(mockPayment);
      paymentsService.saveOrderId.mockResolvedValue(undefined);
      momoService.createPayment.mockResolvedValue(mockMomoResponse);

      const response = await request(app.getHttpServer())
        .post('/momo/create')
        .send(createMomoDto)
        .expect(200);

      expect(response.body).toEqual(mockMomoResponse);

      expect(paymentsService.createDepositPending).toHaveBeenCalledWith(
        1,
        500000,
        PaymentType.DEPOSIT,
      );

      expect(paymentsService.saveOrderId).toHaveBeenCalledWith(
        10,
        expect.stringMatching(/^10-\d+-[a-z0-9]{6}$/),
      );

      expect(momoService.createPayment).toHaveBeenCalledWith(
        expect.stringMatching(/^10-\d+-[a-z0-9]{6}$/),
        500000,
      );
    });

    it('should return 400 when amount is less than 1000', async () => {
      await request(app.getHttpServer())
        .post('/momo/create')
        .send({
          contractId: 1,
          amount: 999,
        })
        .expect(400);
    });
  });

  describe('POST /momo/final/create', () => {
    it('should create final payment and return momo payment url', async () => {
      const finalPayment = {
        ...mockPayment,
        paymentType: PaymentType.FINAL,
      };

      paymentsService.createFinalPending.mockResolvedValue(finalPayment);
      paymentsService.saveOrderId.mockResolvedValue(undefined);
      momoService.createPayment.mockResolvedValue(mockMomoResponse);

      const response = await request(app.getHttpServer())
        .post('/momo/final/create')
        .send(createMomoDto)
        .expect(200);

      expect(response.body).toEqual(mockMomoResponse);

      expect(paymentsService.createFinalPending).toHaveBeenCalledWith(
        1,
        500000,
        PaymentType.FINAL,
      );

      expect(paymentsService.saveOrderId).toHaveBeenCalledWith(
        10,
        expect.stringMatching(/^10-\d+-[a-z0-9]{6}$/),
      );

      expect(momoService.createPayment).toHaveBeenCalledWith(
        expect.stringMatching(/^10-\d+-[a-z0-9]{6}$/),
        500000,
      );
    });
  });

  describe('POST /momo/retry', () => {
    it('should create retry payment from old order id', async () => {
      paymentsService.createRetryPaymentByOrderId.mockResolvedValue({
        ...mockPayment,
        id: 11,
        amount: '500000',
      });
      paymentsService.saveOrderId.mockResolvedValue(undefined);
      momoService.createPayment.mockResolvedValue({
        ...mockMomoResponse,
        orderId: '11-123456-abcdef',
      });

      const response = await request(app.getHttpServer())
        .post('/momo/retry')
        .send({
          orderId: 'old-order-id',
        })
        .expect(200);

      expect(response.body).toEqual({
        ...mockMomoResponse,
        orderId: '11-123456-abcdef',
      });

      expect(paymentsService.createRetryPaymentByOrderId).toHaveBeenCalledWith(
        'old-order-id',
      );

      expect(paymentsService.saveOrderId).toHaveBeenCalledWith(
        11,
        expect.stringMatching(/^11-\d+-[a-z0-9]{6}$/),
      );

      expect(momoService.createPayment).toHaveBeenCalledWith(
        expect.stringMatching(/^11-\d+-[a-z0-9]{6}$/),
        500000,
      );
    });
  });

  describe('POST /momo/callback', () => {
    it('should update payment transaction when callback signature is valid', async () => {
      const callbackBody = {
        orderId: '10-123456-abcdef',
        transId: 'trans-001',
        resultCode: 0,
        responseTime: 1718582400000,
        signature: 'valid-signature',
      };

      momoService.verifyCallback.mockReturnValue(true);
      paymentsService.updateByTransaction.mockResolvedValue(undefined);

      const response = await request(app.getHttpServer())
        .post('/momo/callback')
        .send(callbackBody)
        .expect(200);

      expect(response.body).toEqual({
        message: 'ok',
      });

      expect(momoService.verifyCallback).toHaveBeenCalledWith(callbackBody);

      expect(paymentsService.updateByTransaction).toHaveBeenCalledWith({
        orderId: '10-123456-abcdef',
        transactionRef: 'trans-001',
        resultCode: 0,
        paidAt: new Date(1718582400000),
      });
    });

    it('should return 400 when callback signature is invalid', async () => {
      momoService.verifyCallback.mockReturnValue(false);

      await request(app.getHttpServer())
        .post('/momo/callback')
        .send({
          orderId: '10-123456-abcdef',
          signature: 'invalid-signature',
        })
        .expect(400);
    });
  });

  describe('POST /momo/confirm', () => {
    it('should confirm payment manually', async () => {
      paymentsService.updateByTransaction.mockResolvedValue(undefined);

      const response = await request(app.getHttpServer())
        .post('/momo/confirm')
        .send({
          orderId: '10-123456-abcdef',
          transId: 'trans-001',
          responseTime: '1718582400000',
          resultCode: '0',
        })
        .expect(200);

      expect(response.body).toEqual({
        message: 'Payment confirmed',
      });

      expect(paymentsService.updateByTransaction).toHaveBeenCalledWith({
        orderId: '10-123456-abcdef',
        transactionRef: 'trans-001',
        resultCode: 0,
        paidAt: new Date(1718582400000),
      });
    });
  });
});