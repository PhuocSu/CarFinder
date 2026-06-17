import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { EventController } from '../src/event/event.controller';
import { EventService } from '../src/event/event.service';

describe('EventController (e2e)', () => {
    let app: INestApplication;

    const eventService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    const createEventDto = {
        title: 'Summer Sale',
        subTitle: 'Big discount event',
        fileAttachment: 'https://example.com/event.jpg',
        fileAttachmentName: 'event.jpg',
        startDate: '2026-06-17',
        endDate: '2026-06-30',
        content: 'Event content',
        isTemporarySave: false,
    };

    const mockEvent = {
        id: 1,
        ...createEventDto,
        createdAt: '2026-06-17T00:00:00.000Z',
        updatedAt: '2026-06-17T00:00:00.000Z',
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [EventController],
            providers: [
                {
                    provide: EventService,
                    useValue: eventService,
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

    describe('POST /event', () => {
        it('should create event', async () => {
            eventService.create.mockResolvedValue(mockEvent);

            const response = await request(app.getHttpServer())
                .post('/event')
                .send(createEventDto)
                .expect(201);

            expect(response.body).toEqual(mockEvent);
            expect(eventService.create).toHaveBeenCalledWith(createEventDto);
        });

        it('should return 400 when required field is missing', async () => {
            const { title, ...invalidDto } = createEventDto;

            await request(app.getHttpServer())
                .post('/event')
                .send(invalidDto)
                .expect(400);
        });
    });

    describe('GET /event', () => {
        it('should return paginated events', async () => {
            const result = {
                items: [mockEvent],
                total: 1,
                page: 1,
                limit: 8,
                totalPages: 1,
            };

            eventService.findAll.mockResolvedValue(result);

            const response = await request(app.getHttpServer())
                .get('/event')
                .expect(200);

            expect(response.body).toEqual(result);
            expect(eventService.findAll).toHaveBeenCalledWith(undefined, 1, 8);
        });

        it('should pass search and pagination query to service', async () => {
            const result = {
                items: [mockEvent],
                total: 1,
                page: 2,
                limit: 5,
                totalPages: 1,
            };

            eventService.findAll.mockResolvedValue(result);

            const response = await request(app.getHttpServer())
                .get('/event')
                .query({
                    search: 'summer',
                    page: 2,
                    limit: 5,
                })
                .expect(200);

            expect(response.body).toEqual(result);
            expect(eventService.findAll).toHaveBeenCalledWith('summer', '2', '5');
        });
    });

    describe('GET /event/write', () => {
        it('should return one event by query id', async () => {
            const result = {
                ...mockEvent,
                prevEventId: null,
                nextEventId: 2,
            };

            eventService.findOne.mockResolvedValue(result);

            const response = await request(app.getHttpServer())
                .get('/event/write')
                .query({ id: 1 })
                .expect(200);

            expect(response.body).toEqual(result);
            expect(eventService.findOne).toHaveBeenCalledWith(1);
        });

        it('should return null when event does not exist', async () => {
            eventService.findOne.mockResolvedValue(null);

            const response = await request(app.getHttpServer())
                .get('/event/write')
                .query({ id: 999 })
                .expect(200);

            expect(response.body).toEqual({});
            expect(eventService.findOne).toHaveBeenCalledWith(999);
        });
    });

    describe('PATCH /event/:id', () => {
        it('should update event by id', async () => {
            const updateDto = {
                title: 'Updated Event',
                isTemporarySave: true,
            };

            const updatedEvent = {
                ...mockEvent,
                ...updateDto,
            };

            eventService.update.mockResolvedValue(updatedEvent);

            const response = await request(app.getHttpServer())
                .patch('/event/1')
                .send(updateDto)
                .expect(200);

            expect(response.body).toEqual(updatedEvent);
            expect(eventService.update).toHaveBeenCalledWith(1, updateDto);
        });
    });

    describe('DELETE /event/:id', () => {
        it('should delete event by id', async () => {
            eventService.remove.mockResolvedValue({
                affected: 1,
            });

            await request(app.getHttpServer()).delete('/event/1').expect(204);

            expect(eventService.remove).toHaveBeenCalledWith(1);
        });
    });
});