// backend/test/users.e2e-spec.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const usersService = {
    createAdmin: jest.fn(),
    createIndividual: jest.fn(),
    createBusiness: jest.fn(),
    createAgency: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateAdmin: jest.fn(),
    updateIndividual: jest.fn(),
    updateBusiness: jest.fn(),
    updateAgency: jest.fn(),
    remove: jest.fn(),
    checkCustIdExists: jest.fn(),
    findIndividual: jest.fn(),
    findBusiness: jest.fn(),
    findAgency: jest.fn(),
  };

  const mockAdmin = {
    id: 1,
    custName: 'Admin User',
    custId: 'admin1',
    custPw: 'hashedPassword',
    role: 'ADMIN',
  };

  const mockIndividual = {
    id: 2,
    custName: 'Individual User',
    custId: 'individual1',
    custPw: 'hashedPassword',
    role: 'INDIVIDUAL',
    hpNo: '0123456789',
    email: 'user@example.com',
  };

  const mockBusiness = {
    id: 3,
    custName: 'Business User',
    custId: 'business1',
    custPw: 'hashedPassword',
    role: 'BUSINESS',
    reprsntName: 'Business Co',
    corpRegNo: 'BIZ123',
    corpTellNo: '0123456789',
    bnsmRegNo: 'BN123',
    custRep: 'Rep Name',
    custRepPhone: '0123456789',
  };

  const mockAgency = {
    id: 4,
    custName: 'Agency User',
    custId: 'agency1',
    custPw: 'hashedPassword',
    role: 'AGENCY',
    reprsntName: 'Agency Co',
    corpTellNo: '0123456789',
    bnsmRegNo: 'AG123',
    custRep: 'Agency Rep',
    custRepPhone: '0987654321',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
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

  describe('POST /users/admin', () => {
    it('should create admin user', async () => {
      usersService.createAdmin.mockResolvedValue(mockAdmin);

      const response = await request(app.getHttpServer())
        .post('/users/admin')
        .send({
          custName: 'Admin User',
          custId: 'admin1',
          custPw: 'password123',
          role: 'ADMIN',
        })
        .expect(201);

      expect(response.body).toEqual({
        message: 'Admin created successfully',
        user: mockAdmin,
      });
      expect(usersService.createAdmin).toHaveBeenCalledWith({
        custName: 'Admin User',
        custId: 'admin1',
        custPw: 'password123',
        role: 'ADMIN',
      });
    });
  });

  describe('POST /users/individual', () => {
    it('should create individual user', async () => {
      usersService.createIndividual.mockResolvedValue(mockIndividual);

      const response = await request(app.getHttpServer())
        .post('/users/individual')
        .send({
          custName: 'Individual User',
          custId: 'individual1',
          custPw: 'password123',
          hpNo: '0123456789',
          email: 'user@example.com',
        })
        .expect(201);

      expect(response.body).toEqual({
        message: 'Individual created successfully',
        user: mockIndividual,
      });
      expect(usersService.createIndividual).toHaveBeenCalledWith(
        expect.objectContaining({
          custName: 'Individual User',
          custId: 'individual1',
          custPw: 'password123',
          hpNo: '0123456789',
          email: 'user@example.com',
        }),
      );
    });
  });

  describe('POST /users/business', () => {
    it('should create business user', async () => {
      usersService.createBusiness.mockResolvedValue(mockBusiness);

      const response = await request(app.getHttpServer())
        .post('/users/business')
        .send({
          custName: 'Business User',
          custId: 'business1',
          custPw: 'password123',
          role: 'BUSINESS',
          reprsntName: 'Business Co',
          corpRegNo: 'BIZ123',
          corpTellNo: '0123456789',
          bnsmRegNo: 'BN123',
          custRep: 'Rep Name',
          custRepPhone: '0123456789',
        })
        .expect(201);

      expect(response.body).toEqual({
        message: 'Business created successfully',
        user: mockBusiness,
      });
      expect(usersService.createBusiness).toHaveBeenCalledWith({
        custName: 'Business User',
        custId: 'business1',
        custPw: 'password123',
        role: 'BUSINESS',
        reprsntName: 'Business Co',
        corpRegNo: 'BIZ123',
        corpTellNo: '0123456789',
        bnsmRegNo: 'BN123',
        custRep: 'Rep Name',
        custRepPhone: '0123456789',
      });
    });
  });

  describe('POST /users/agency', () => {
    it('should create agency user', async () => {
      usersService.createAgency.mockResolvedValue(mockAgency);

      const response = await request(app.getHttpServer())
        .post('/users/agency')
        .send({
          custName: 'Agency User',
          custId: 'agency1',
          custPw: 'password123',
          role: 'AGENCY',
          reprsntName: 'Agency Co',
          corpTellNo: '0123456789',
          bnsmRegNo: 'AG123',
          custRep: 'Agency Rep',
          custRepPhone: '0987654321',
        })
        .expect(201);

      expect(response.body).toEqual({
        message: 'Agency created successfully',
        user: mockAgency,
      });
      expect(usersService.createAgency).toHaveBeenCalledWith({
        custName: 'Agency User',
        custId: 'agency1',
        custPw: 'password123',
        role: 'AGENCY',
        reprsntName: 'Agency Co',
        corpTellNo: '0123456789',
        bnsmRegNo: 'AG123',
        custRep: 'Agency Rep',
        custRepPhone: '0987654321',
      });
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      usersService.findAll.mockResolvedValue([mockAdmin, mockIndividual]);

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([mockAdmin, mockIndividual]);
      expect(usersService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by custId', async () => {
      usersService.findOne.mockResolvedValue(mockAdmin);

      const response = await request(app.getHttpServer())
        .get('/users/admin1')
        .expect(200);

      expect(response.body).toEqual(mockAdmin);
      expect(usersService.findOne).toHaveBeenCalledWith('admin1');
    });

    it('should return empty object when user not found', async () => {
      usersService.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/users/unknown')
        .expect(200);

      expect(response.body).toEqual({});
      expect(usersService.findOne).toHaveBeenCalledWith('unknown');
    });
  });

  describe('PATCH /users/admin/:id', () => {
    it('should update admin user', async () => {
      const updateDto = { custName: 'Admin Updated' };
      const updatedAdmin = { ...mockAdmin, ...updateDto };

      usersService.updateAdmin.mockResolvedValue(updatedAdmin);

      const response = await request(app.getHttpServer())
        .patch('/users/admin/1')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedAdmin);
      expect(usersService.updateAdmin).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('PATCH /users/individual/:id', () => {
    it('should update individual user', async () => {
      const updateDto = { hpNo: 987654321 };
      const updatedIndividual = { ...mockIndividual, ...updateDto };

      usersService.updateIndividual.mockResolvedValue(updatedIndividual);

      const response = await request(app.getHttpServer())
        .patch('/users/individual/2')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedIndividual);
      expect(usersService.updateIndividual).toHaveBeenCalledWith(2, updateDto);
    });
  });

  describe('PATCH /users/business/:id', () => {
    it('should update business user', async () => {
      const updateDto = { corpTellNo: 987654321 };
      const updatedBusiness = { ...mockBusiness, ...updateDto };

      usersService.updateBusiness.mockResolvedValue(updatedBusiness);

      const response = await request(app.getHttpServer())
        .patch('/users/business/3')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedBusiness);
      expect(usersService.updateBusiness).toHaveBeenCalledWith(3, updateDto);
    });
  });

  describe('PATCH /users/agency/:id', () => {
    it('should update agency user', async () => {
      const updateDto = { corpTellNo: 987654321 };
      const updatedAgency = { ...mockAgency, ...updateDto };

      usersService.updateAgency.mockResolvedValue(updatedAgency);

      const response = await request(app.getHttpServer())
        .patch('/users/agency/4')
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual(updatedAgency);
      expect(usersService.updateAgency).toHaveBeenCalledWith(4, updateDto);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user', async () => {
      usersService.remove.mockResolvedValue({ affected: 1 });

      const response = await request(app.getHttpServer())
        .delete('/users/1')
        .expect(200);

      expect(response.body).toEqual({ affected: 1 });
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /users/check-custId', () => {
    it('should return exists false when custId available', async () => {
      usersService.checkCustIdExists.mockResolvedValue(false);

      const response = await request(app.getHttpServer())
        .post('/users/check-custId')
        .query({ custId: 'newuser' })
        .expect(201);

      expect(response.body).toEqual({
        exists: false,
        message: 'custId is available',
      });
      expect(usersService.checkCustIdExists).toHaveBeenCalledWith('newuser');
    });

    it('should return exists true when custId taken', async () => {
      usersService.checkCustIdExists.mockResolvedValue(true);

      const response = await request(app.getHttpServer())
        .post('/users/check-custId')
        .query({ custId: 'admin1' })
        .expect(201);

      expect(response.body).toEqual({
        exists: true,
        message: 'custId already exists',
      });
      expect(usersService.checkCustIdExists).toHaveBeenCalledWith('admin1');
    });
  });

  describe('GET /users/individual/:id', () => {
    it('should return individual user', async () => {
      usersService.findIndividual.mockResolvedValue(mockIndividual);

      const response = await request(app.getHttpServer())
        .get('/users/individual/2')
        .expect(200);

      expect(response.body).toEqual(mockIndividual);
      expect(usersService.findIndividual).toHaveBeenCalledWith(2);
    });
  });

  describe('GET /users/business/:id', () => {
    it('should return business user', async () => {
      usersService.findBusiness.mockResolvedValue(mockBusiness);

      const response = await request(app.getHttpServer())
        .get('/users/business/3')
        .expect(200);

      expect(response.body).toEqual(mockBusiness);
      expect(usersService.findBusiness).toHaveBeenCalledWith(3);
    });
  });

  describe('GET /users/agency/:id', () => {
    it('should return agency user', async () => {
      usersService.findAgency.mockResolvedValue(mockAgency);

      const response = await request(app.getHttpServer())
        .get('/users/agency/4')
        .expect(200);

      expect(response.body).toEqual(mockAgency);
      expect(usersService.findAgency).toHaveBeenCalledWith(4);
    });
  });
});