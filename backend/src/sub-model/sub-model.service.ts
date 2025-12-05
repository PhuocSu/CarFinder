import { Injectable } from '@nestjs/common';
import { CreateSubModelDto } from './dto/create-sub-model.dto';
import { UpdateSubModelDto } from './dto/update-sub-model.dto';
import { Repository } from 'typeorm';
import { SubModel } from './entities/sub-model.entity';
import { Model } from '../model/entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubModelService {
  constructor(
    @InjectRepository(SubModel)
    private readonly subModelRepository: Repository<SubModel>,

    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createSubModelDto: CreateSubModelDto) {
    try {
      const model = await this.modelRepository.findOne({ 
        where: { id: createSubModelDto.modelId } 
      });
  
      if (!model) {
        throw new Error('Model not found');
      }
  
      const subModel = this.subModelRepository.create({
        subModelName: createSubModelDto.subModelName,
        modelId: createSubModelDto.modelId,
      });
      return this.subModelRepository.save(subModel);
    } catch (error) {
      console.log("Error creating sub-model:",error);
      throw new Error('Failed to create sub-model');
    }
  }

  async findAll() {
    try {
      return await this.subModelRepository.find({ relations: ['model'] });
    } catch (error) {
      console.log("Error finding all sub-models:",error);
      throw new Error('Failed to find all sub-models');
    }
  }

  async findOne(id: number) {
    try {
      return await this.subModelRepository.findOne({ 
        where: { id }, 
      relations: ['model'] 
    });
    } catch (error) {
      console.log("Error finding sub-model:",error);
      throw new Error('Failed to find sub-model');
    }
  }

  async update(id: number, updateSubModelDto: UpdateSubModelDto) {
    try {
      const dataToUpdate: any = {
        id,
        subModelName: updateSubModelDto.subModelName
      }
  
      if (updateSubModelDto.modelId){
        const exists = await this.modelRepository.findOne({
          where: {id: updateSubModelDto.modelId}
        })
        if (!exists) {
          throw new Error('Model not found');
        }
        dataToUpdate.modelId = updateSubModelDto.modelId;
      }
  
      const subModel = await this.subModelRepository.preload(dataToUpdate);
      if (!subModel) {
        throw new Error('SubModel not found');
      }
      return await this.subModelRepository.save(subModel);
    } catch (error) {
      console.log("Error updating sub-model:",error);
      throw new Error('Failed to update sub-model');
    }
  }

  async remove(id: number) {
    try {
      const subModel = await this.subModelRepository.findOne({ where: { id } });
    if (!subModel) {
      throw new Error('SubModel not found');
    }
    return await this.subModelRepository.remove(subModel);
    } catch (error) {
      console.log("Error removing sub-model:",error);
      throw new Error('Failed to remove sub-model');
    }
  }
}
