import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { SubModelController } from '../src/sub-model/sub-model.controller';
import { SubModelService } from '../src/sub-model/sub-model.service';

describe('SubModelController (e2e)', () => {
  let app: INestApplication;

  const subModelService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const createSubModelDto = {
    subModelName: 'Sonata 2.0',
    modelId: 1,
  };

  const mockSubModel = {
    id: 1,
    subModelName: 'Sonata 2.0',
    modelId: 1,
    model: {
      id: 1,
      modelName: 'Sonata',
    },
    createdAt: '2026-06-17T00:00:00.000Z',
    updatedAt: '2026-06-17T00:00:00.000Z',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SubModelController],
      providers: [
        {
          provide: SubModelService,
          useValue: subModelService,
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

  describe('POST /sub-model', () => {
    it('should create a sub-model', async () => {
      subModelService.create.mockResolvedValue(mockSubModel);

      const response = await request(app.getHttpServer())
        .post('/sub-model')
        .send(createSubModelDto)
        .expect(201);

      expect(response.body).toEqual(mockSubModel);
      expect(subModelService.create).toHaveBeenCalledWith(createSubModelDto);
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/sub-model')
        .send({})
        .expect(400);
    });
  });

  describe('GET /sub-model', () => {
    it('should return all sub-models', async () => {
      subModelService.findAll.mockResolvedValue([mockSubModel]);

      const response = await request(app.getHttpServer())
        .get('/sub-model')
        .expect(200);

      expect(response.body).toEqual([mockSubModel]);
      expect(subModelService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('GET /sub-model/:id', () => {
    it('should return a single sub-model by id', async () => {
      subModelService.findOne.mockResolvedValue(mockSubModel);

      const response = await request(app.getHttpServer())
        .get('/sub-model/1')
        .expect(200);

      expect(response.body).toEqual(mockSubModel);
      expect(subModelService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return empty object when sub-model does not exist', async () => {
      subModelService.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/sub-model/999')
        .expect(200);

      expect(response.body).toEqual({});
      expect(subModelService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('PATCH /sub-model/:id', () => {
    it('should update a sub-model', async () => {
      const updateDto = {
        subModelName: 'Sonata 2.4',
      };
      const updatedSubModel = {
        ...mockSubModel,
        ...updateDto,
      };

      subModelService.update.mockResolvedValue(updatedSubModel);

      const response = await request(app.getHttpServer())
        .patch('/sub-model/1')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedSubModel);
      expect(subModelService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('DELETE /sub-model/:id', () => {
    it('should remove a sub-model', async () => {
      subModelService.remove.mockResolvedValue(mockSubModel);

      const response = await request(app.getHttpServer())
        .delete('/sub-model/1')
        .expect(200);

      expect(response.body).toEqual(mockSubModel);
      expect(subModelService.remove).toHaveBeenCalledWith(1);
    });
  });
});
