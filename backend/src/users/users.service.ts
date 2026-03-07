import { Injectable } from '@nestjs/common';
import { BaseCreateUserDto } from './dto/create/base-create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create/create-admin.dto';
import { CreateIndividualDto } from './dto/create/create-individual.dto';
import { CreateBusinessDto } from './dto/create/create-business.dto';
import { CreateAgencyDto } from './dto/create/create-agency.dto';
import { UpdateAdminDto } from './dto/update/update-admin.dto';
import { UpdateIndividualDto } from './dto/update/update-individual.dto';
import { UpdateBusinessDto } from './dto/update/update-business.dto';
import { UpdateAgencyDto } from './dto/update/update-agency.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string>{
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async withHashedPassword<T extends { custPw?: string }>(dto: T): Promise<T> {
    if (!dto.custPw) return dto;
    return {
      ...dto,
      custPw: await this.hashPassword(dto.custPw),
    };
  }

  //admin
  async createAdmin (createAdminDto: CreateAdminDto) {
    const user = this.userRepository.create({
      ...createAdminDto,
      custPw: await this.hashPassword(createAdminDto.custPw),
      role: Role.ADMIN,
    });
    return await this.userRepository.save(user);
  }
  //individual
  async createIndividual (createIndividualDto: CreateIndividualDto) {
    const user = this.userRepository.create({
      ...createIndividualDto,
      custPw: await this.hashPassword(createIndividualDto.custPw),
      role: Role.INDIVIDUAL,
    });
    return await this.userRepository.save(user);
  }
  //business
  async createBusiness (createBusinessDto: CreateBusinessDto) {
    const user = this.userRepository.create({
      ...createBusinessDto,
      custPw: await this.hashPassword(createBusinessDto.custPw),
      role: Role.BUSINESS,
    });
    return await this.userRepository.save(user);
  }
  //agency
  async createAgency (createAgencyDto: CreateAgencyDto) {
    const user = this.userRepository.create({
      ...createAgencyDto,
      custPw: await this.hashPassword(createAgencyDto.custPw),
      role: Role.AGENCY,
    });
    return await this.userRepository.save(user);
  }


  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(custId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { custId } });
  }

  //admin
  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.userRepository.findOne({where: {id}})
    if (!user || user.role !== Role.ADMIN) {
      throw new Error('User not found');
    }

    const updateData = await this.withHashedPassword(updateAdminDto);
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  //Individual
  async updateIndividual(id: number, updateIndividualDto: UpdateIndividualDto) {
    const user = await this.userRepository.findOne({where: {id}})
    if (!user || user.role !== Role.INDIVIDUAL) {
      throw new Error('User not found');
    }

    const updateData = await this.withHashedPassword(updateIndividualDto);
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  //business
  async updateBusiness(id: number, updateBusinessDto: UpdateBusinessDto) {
    const user = await this.userRepository.findOne({where: {id}})
    if (!user || user.role !== Role.BUSINESS) {
      throw new Error('User not found');
    }

    const updateData = await this.withHashedPassword(updateBusinessDto);
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  //agency
  async updateAgency(id: number, updateAgencyDto: UpdateAgencyDto) {
    const user = await this.userRepository.findOne({where: {id}})
    if (!user || user.role !== Role.AGENCY) {
      throw new Error('User not found');
    }

    const updateData = await this.withHashedPassword(updateAgencyDto);
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async checkCustIdExists(custId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { custId } });
    return !!user; 
  }

  // Fetch methods for different user types
  async findIndividual(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id, role: Role.INDIVIDUAL } });
  }

  async findBusiness(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id, role: Role.BUSINESS } });
  }

  async findAgency(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id, role: Role.AGENCY } });
  }
}