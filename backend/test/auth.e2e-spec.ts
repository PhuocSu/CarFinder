import { INestApplication, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { RolesGuard } from '../src/auth/guards/roles.guard';
import { Role } from '../src/users/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const authService = {
    signIn: jest.fn(),
    refreshAccessToken: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = {
        sub: 1,
        username: 'test-user',
        role: Role.INDIVIDUAL,
      };
      return true;
    }),
  };

  const mockRolesGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());
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

  describe('POST /auth/login', () => {
    it('should login and return access token + refresh token', async () => {
      authService.signIn.mockResolvedValue({
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
      });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'test-user',
          password: '123456',
        })
        .expect(200);

      expect(response.body).toEqual({
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
      });

      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining([
          expect.stringContaining('refresh_token=mock-refresh-token'),
        ]),
      );

      expect(authService.signIn).toHaveBeenCalledWith(
        'test-user',
        '123456',
        expect.any(Object),
      );
    });

    it('should return 400 when password is missing', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'test-user',
        })
        .expect(400);
    });

    it('should return 401 when credentials are invalid', async () => {
      authService.signIn.mockRejectedValue(
        new UnauthorizedException('Invalid credential'),
      );

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'test-user',
          password: 'wrong-password',
        })
        .expect(401);
    });
  });

  describe('POST /auth/refresh', () => {
    it('should refresh access token from cookie', async () => {
      authService.refreshAccessToken.mockResolvedValue({
        access_token: 'new-access-token',
        refreshToken: 'mock-refresh-token',
      });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Cookie', ['refresh_token=mock-refresh-token'])
        .expect(201);

      expect(response.body).toEqual({
        access_token: 'new-access-token',
        refreshToken: 'mock-refresh-token',
      });

      expect(authService.refreshAccessToken).toHaveBeenCalledWith(
        'mock-refresh-token',
      );
    });

    it('should return 401 when refresh token cookie is missing', async () => {
      await request(app.getHttpServer()).post('/auth/refresh').expect(401);
    });
  });

  describe('GET /auth/profile', () => {
    it('should return current user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .expect(200);

      expect(response.body).toEqual({
        userId: 1,
        username: 'test-user',
        role: Role.INDIVIDUAL,
      });
    });
  });

  describe('GET /auth/test-token', () => {
    it('should return token valid message', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/test-token')
        .expect(200);

      expect(response.body.message).toBe('Token hợp lệ!');
      expect(response.body.user).toEqual({
        sub: 1,
        username: 'test-user',
        role: Role.INDIVIDUAL,
      });
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
