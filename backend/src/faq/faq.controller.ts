import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Category } from './entities/faq.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'src/others/config/multer-storage.config';
import type MulterFile from 'src/others/types/MulterFile.type';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Public()
  @Get()
  findAll(
    @Query('category') category?: Category,
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.faqService.findAll(category, search, page, limit);
  }

  @Public()
  @Get('/write')
  findOne(@Query('id') id: number) {
    return this.faqService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.faqService.remove(id);
  }

  @Roles(Role.ADMIN)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: cloudinaryStorage,
    }),
  )
  upload(@UploadedFile() file: MulterFile) {
    return {
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
    };
  }
}
