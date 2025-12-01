import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseCreateUserDto } from './dto/create/base-create-user.dto';
import { CreateAdminDto } from './dto/create/create-admin.dto';
import { CreateIndividualDto } from './dto/create/create-individual.dto';
import { CreateBusinessDto } from './dto/create/create-business.dto';
import { CreateAgencyDto } from './dto/create/create-agency.dto';
import { UpdateAdminDto } from './dto/update/update-admin.dto';
import { UpdateIndividualDto } from './dto/update/update-individual.dto';
import { UpdateBusinessDto } from './dto/update/update-business.dto';
import { UpdateAgencyDto } from './dto/update/update-agency.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Admin
  @Post('admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const user = await this.usersService.createAdmin(createAdminDto);
    return {
      message: 'Admin created successfully',
      user,
    };
  }
  //individual
  @Public()
  @Post('individual')
  async createIndividual(@Body() createIndividualDto: CreateIndividualDto) {
    const user = await this.usersService.createIndividual(createIndividualDto);
    return {
      message: 'Individual created successfully',
      user,
    };
  }
  //business
  @Public()
  @Post('business')
  async createBusiness(@Body() createBusinessDto: CreateBusinessDto) {
    const user = await this.usersService.createBusiness(createBusinessDto);
    return {
      message: 'Business created successfully',
      user,
    };
  }
  //agency
  @Public()
  @Post('agency')
  async createAgency(@Body() createAgencyDto: CreateAgencyDto) {
    const user = await this.usersService.createAgency(createAgencyDto);
    return {
      message: 'Agency created successfully',
      user,
    };  
  }
  
  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') custId: string) {
    return this.usersService.findOne(custId);
  }

  @Roles(Role.ADMIN)
  @Patch('admin/:id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.usersService.updateAdmin(+id, updateAdminDto);
  }

  @Roles(Role.ADMIN, Role.INDIVIDUAL)
  @Patch('individual/:id')
  async updateIndividual(@Param('id') id: string, @Body() updateIndividualDto: UpdateIndividualDto) {
    return this.usersService.updateIndividual(+id, updateIndividualDto);
  }

  @Roles(Role.ADMIN, Role.BUSINESS)
  @Patch('business/:id')
  async updateBusiness(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.usersService.updateBusiness(+id, updateBusinessDto);
  }

  @Roles(Role.ADMIN, Role.AGENCY)
  @Patch('agency/:id')
  async updateAgency(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.usersService.updateAgency(+id, updateAgencyDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
