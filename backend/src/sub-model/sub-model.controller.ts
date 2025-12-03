import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubModelService } from './sub-model.service';
import { CreateSubModelDto } from './dto/create-sub-model.dto';
import { UpdateSubModelDto } from './dto/update-sub-model.dto';

@Controller('sub-model')
export class SubModelController {
  constructor(private readonly subModelService: SubModelService) {}

  @Post()
  create(@Body() createSubModelDto: CreateSubModelDto) {
    return this.subModelService.create(createSubModelDto);
  }

  @Get()
  findAll() {
    return this.subModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subModelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubModelDto: UpdateSubModelDto) {
    return this.subModelService.update(+id, updateSubModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subModelService.remove(+id);
  }
}
