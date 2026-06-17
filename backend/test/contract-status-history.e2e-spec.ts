import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ContractStatusHistoryController } from '../src/contract-status-history/contract-status-history.controller';
import { ContractStatusHistoryService } from '../src/contract-status-history/contract-status-history.service';

describe('ContractStatusHistoryController (e2e)', () => {
  let app: INestApplication;

  const contractStatusHistoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ContractStatusHistoryController],
      providers: [
        {
          provide: ContractStatusHistoryService,
          useValue: contractStatusHistoryService,
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

  describe('POST /contract-status-history', () => {
    it('should create contract status history', async () => {
      const result = 'This action adds a new contractStatusHistory';

      contractStatusHistoryService.create.mockReturnValue(result);

      const response = await request(app.getHttpServer())
        .post('/contract-status-history')
        .send({})
        .expect(201);

      expect(response.text).toBe(result);
      expect(contractStatusHistoryService.create).toHaveBeenCalledWith({});
    });
  });

  describe('GET /contract-status-history', () => {
    it('should return all contract status histories', async () => {
      const result = 'This action returns all contractStatusHistory';

      contractStatusHistoryService.findAll.mockReturnValue(result);

      const response = await request(app.getHttpServer())
        .get('/contract-status-history')
        .expect(200);

      expect(response.text).toBe(result);
      expect(contractStatusHistoryService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('GET /contract-status-history/:id', () => {
    it('should return one contract status history by id', async () => {
      const result = 'This action returns a #1 contractStatusHistory';

      contractStatusHistoryService.findOne.mockReturnValue(result);

      const response = await request(app.getHttpServer())
        .get('/contract-status-history/1')
        .expect(200);

      expect(response.text).toBe(result);
      expect(contractStatusHistoryService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('PATCH /contract-status-history/:id', () => {
    it('should update contract status history by id', async () => {
      const result = 'This action updates a #1 contractStatusHistory';

      contractStatusHistoryService.update.mockReturnValue(result);

      const response = await request(app.getHttpServer())
        .patch('/contract-status-history/1')
        .send({})
        .expect(200);

      expect(response.text).toBe(result);
      expect(contractStatusHistoryService.update).toHaveBeenCalledWith(1, {});
    });
  });

  describe('DELETE /contract-status-history/:id', () => {
    it('should remove contract status history by id', async () => {
      const result = 'This action removes a #1 contractStatusHistory';

      contractStatusHistoryService.remove.mockReturnValue(result);

      const response = await request(app.getHttpServer())
        .delete('/contract-status-history/1')
        .expect(200);

      expect(response.text).toBe(result);
      expect(contractStatusHistoryService.remove).toHaveBeenCalledWith(1);
    });
  });
});