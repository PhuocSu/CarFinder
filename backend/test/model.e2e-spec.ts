import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ModelController } from '../src/model/model.controller';
import { ModelService } from '../src/model/model.service';

describe('ModelController (e2e)', () => {
  let app: INestApplication;

  const modelService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const createModelDto = {
    modelName: 'Sonata',
  };

  const mockModel = {
    id: 1,
    modelName: 'Sonata',
    subModels: [
      {
        id: 1,
        subModelName: 'Sonata 2.0',
      },
    ],
    createdAt: '2026-06-17T00:00:00.000Z',
    updatedAt: '2026-06-17T00:00:00.000Z',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [
        {
          provide: ModelService,
          useValue: modelService,
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

  describe('POST /model', () => {
    it('should create model', async () => {
      modelService.create.mockResolvedValue(mockModel);

      const response = await request(app.getHttpServer())
        .post('/model')
        .send(createModelDto)
        .expect(201);

      expect(response.body).toEqual(mockModel);
      expect(modelService.create).toHaveBeenCalledWith(createModelDto);
    });

    it('should return 400 when modelName is missing', async () => {
      await request(app.getHttpServer())
        .post('/model')
        .send({})
        .expect(400);
    });
  });

  describe('GET /model', () => {
    it('should return all models', async () => {
      modelService.findAll.mockResolvedValue([mockModel]);

      const response = await request(app.getHttpServer())
        .get('/model')
        .expect(200);

      expect(response.body).toEqual([mockModel]);
      expect(modelService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('GET /model/:id', () => {
    it('should return one model by id', async () => {
      modelService.findOne.mockResolvedValue(mockModel);

      const response = await request(app.getHttpServer())
        .get('/model/1')
        .expect(200);

      expect(response.body).toEqual(mockModel);
      expect(modelService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return empty object when model does not exist', async () => {
      modelService.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/model/999')
        .expect(200);

      expect(response.body).toEqual({});
      expect(modelService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('PATCH /model/:id', () => {
    it('should update model by id', async () => {
      const updateDto = {
        modelName: 'Updated Sonata',
      };

      const updatedModel = {
        ...mockModel,
        ...updateDto,
      };

      modelService.update.mockResolvedValue(updatedModel);

      const response = await request(app.getHttpServer())
        .patch('/model/1')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedModel);
      expect(modelService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('DELETE /model/:id', () => {
    it('should delete model by id', async () => {
      modelService.remove.mockResolvedValue(mockModel);

      const response = await request(app.getHttpServer())
        .delete('/model/1')
        .expect(200);

      expect(response.body).toEqual(mockModel);
      expect(modelService.remove).toHaveBeenCalledWith(1);
    });
  });
});