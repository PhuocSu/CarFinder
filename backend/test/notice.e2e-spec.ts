import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NoticeController } from '../src/notice/notice.controller';
import { NoticeService } from '../src/notice/notice.service';

describe('NoticeController (e2e)', () => {
  let app: INestApplication;

  const noticeService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const createNoticeDto = {
    title: 'Important Notice',
    fileAttachment: 'https://example.com/notice.pdf',
    fileAttachmentName: 'notice.pdf',
    content: 'Notice content',
    isTemporarySave: false,
  };

  const mockNotice = {
    id: 1,
    ...createNoticeDto,
    createdAt: '2026-06-17T00:00:00.000Z',
    updatedAt: '2026-06-17T00:00:00.000Z',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [NoticeController],
      providers: [
        {
          provide: NoticeService,
          useValue: noticeService,
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

  describe('POST /notice', () => {
    it('should create notice', async () => {
      noticeService.create.mockResolvedValue(mockNotice);

      const response = await request(app.getHttpServer())
        .post('/notice')
        .send(createNoticeDto)
        .expect(201);

      expect(response.body).toEqual(mockNotice);
      expect(noticeService.create).toHaveBeenCalledWith(createNoticeDto);
    });

    it('should return 400 when required field is missing', async () => {
      const { title, ...invalidDto } = createNoticeDto;

      await request(app.getHttpServer())
        .post('/notice')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /notice', () => {
    it('should return paginated notices', async () => {
      const result = {
        items: [mockNotice],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      noticeService.findAll.mockResolvedValue(result);

      const response = await request(app.getHttpServer())
        .get('/notice')
        .expect(200);

      expect(response.body).toEqual(result);
      expect(noticeService.findAll).toHaveBeenCalledWith(undefined, 1, 10);
    });

    it('should pass search and pagination query to service', async () => {
      const result = {
        items: [mockNotice],
        total: 1,
        page: 2,
        limit: 5,
        totalPages: 1,
      };

      noticeService.findAll.mockResolvedValue(result);

      const response = await request(app.getHttpServer())
        .get('/notice')
        .query({
          search: 'important',
          page: 2,
          limit: 5,
        })
        .expect(200);

      expect(response.body).toEqual(result);
      expect(noticeService.findAll).toHaveBeenCalledWith(
        'important',
        '2',
        '5',
      );
    });
  });

  describe('GET /notice/write', () => {
    it('should return one notice by query id', async () => {
      noticeService.findOne.mockResolvedValue(mockNotice);

      const response = await request(app.getHttpServer())
        .get('/notice/write')
        .query({ id: 1 })
        .expect(200);

      expect(response.body).toEqual(mockNotice);
      expect(noticeService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return empty object when notice does not exist', async () => {
      noticeService.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/notice/write')
        .query({ id: 999 })
        .expect(200);

      expect(response.body).toEqual({});
      expect(noticeService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('PATCH /notice/:id', () => {
    it('should update notice by id and return updated notice', async () => {
      const updateDto = {
        title: 'Updated Notice',
        isTemporarySave: true,
      };

      const updatedNotice = {
        ...mockNotice,
        ...updateDto,
      };

      noticeService.update.mockResolvedValue({
        affected: 1,
      });
      noticeService.findOne.mockResolvedValue(updatedNotice);

      const response = await request(app.getHttpServer())
        .patch('/notice/1')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedNotice);
      expect(noticeService.update).toHaveBeenCalledWith(1, updateDto);
      expect(noticeService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('DELETE /notice/:id', () => {
    it('should delete notice by id', async () => {
      noticeService.remove.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer()).delete('/notice/1').expect(204);

      expect(noticeService.remove).toHaveBeenCalledWith(1);
    });
  });
});