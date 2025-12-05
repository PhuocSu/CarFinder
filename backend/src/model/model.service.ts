import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  create(createModelDto: CreateModelDto) {
    const model = this.modelRepository.create(createModelDto);
    return this.modelRepository.save(model);
  }

  async findAll() {
    return await this.modelRepository.find({
      relations: ['subModels'],
    });
  }

  async findOne(id: number) {
    return await this.modelRepository.findOne({
      where: { id },
      relations: ['subModels'],
    });
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const model = await this.modelRepository.preload({
      id,
      ...updateModelDto, 
    }); //preload: tìm bản ghi, merge các field trong updateModelDto, ko ghì đè những field ko tồn tại
    if (!model) {
      throw new Error('Model not found');
    }
    return await this.modelRepository.save(model);
  }

  async remove(id: number) {
    const model = await this.modelRepository.findOne({ where: { id } });
    if (!model) {
      throw new Error('Model not found');
    }
    return await this.modelRepository.remove(model);
  }
}
