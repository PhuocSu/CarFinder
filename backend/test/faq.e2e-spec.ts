import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FaqController } from '../src/faq/faq.controller';
import { FaqService } from '../src/faq/faq.service';
import { Category } from '../src/faq/entities/faq.entity';

describe('FaqController (e2e)', () => {
  let app: INestApplication;

  const faqService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const createFaqDto = {
    title: 'How to buy a car?',
    category: Category.VEHICLE_AND_CONTRACT_PROCEDURE,
    fileAttachment: 'https://example.com/faq.pdf',
    fileAttachmentName: 'faq.pdf',
    content: 'FAQ content',
    isTemporarySave: false,
  };

  const mockFaq = {
    id: 1,
    ...createFaqDto,
    createdAt: '2026-06-17T00:00:00.000Z',
    updatedAt: '2026-06-17T00:00:00.000Z',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FaqController],
      providers: [
        {
          provide: FaqService,
          useValue: faqService,
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

  describe('POST /faq', () => {
    it('should create faq', async () => {
      faqService.create.mockResolvedValue(mockFaq);

      const response = await request(app.getHttpServer())
        .post('/faq')
        .send(createFaqDto)
        .expect(201);

      expect(response.body).toEqual(mockFaq);
      expect(faqService.create).toHaveBeenCalledWith(createFaqDto);
    });

    it('should return 400 when required field is missing', async () => {
      const { title, ...invalidDto } = createFaqDto;

      await request(app.getHttpServer())
        .post('/faq')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /faq', () => {
    it('should return paginated faqs', async () => {
      const result = {
        items: [mockFaq],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      faqService.findAll.mockResolvedValue(result);

      const response = await request(app.getHttpServer())
        .get('/faq')
        .expect(200);

      expect(response.body).toEqual(result);
      expect(faqService.findAll).toHaveBeenCalledWith(
        undefined,
        undefined,
        1,
        10,
      );
    });

    it('should pass category, search, and pagination query to service', async () => {
      const result = {
        items: [mockFaq],
        total: 1,
        page: 2,
        limit: 5,
        totalPages: 1,
      };

      faqService.findAll.mockResolvedValue(result);

      const response = await request(app.getHttpServer())
        .get('/faq')
        .query({
          category: Category.VEHICLE_AND_CONTRACT_PROCEDURE,
          search: 'contract',
          page: 2,
          limit: 5,
        })
        .expect(200);

      expect(response.body).toEqual(result);
      expect(faqService.findAll).toHaveBeenCalledWith(
        Category.VEHICLE_AND_CONTRACT_PROCEDURE,
        'contract',
        '2',
        '5',
      );
    });
  });

  describe('GET /faq/write', () => {
    it('should return one faq by query id', async () => {
      faqService.findOne.mockResolvedValue(mockFaq);

      const response = await request(app.getHttpServer())
        .get('/faq/write')
        .query({ id: 1 })
        .expect(200);

      expect(response.body).toEqual(mockFaq);
      expect(faqService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return empty object when faq does not exist', async () => {
      faqService.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/faq/write')
        .query({ id: 999 })
        .expect(200);

      expect(response.body).toEqual({});
      expect(faqService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('PATCH /faq/:id', () => {
    it('should update faq by id', async () => {
      const updateDto = {
        title: 'Updated FAQ',
        isTemporarySave: true,
      };

      const updatedFaq = {
        ...mockFaq,
        ...updateDto,
      };

      faqService.update.mockResolvedValue(updatedFaq);

      const response = await request(app.getHttpServer())
        .patch('/faq/1')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedFaq);
      expect(faqService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('DELETE /faq/:id', () => {
    it('should delete faq by id', async () => {
      faqService.remove.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer()).delete('/faq/1').expect(204);

      expect(faqService.remove).toHaveBeenCalledWith(1);
    });
  });
});