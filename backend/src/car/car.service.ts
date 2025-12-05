import { Catch, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { SubModel } from 'src/sub-model/entities/sub-model.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(SubModel)
    private readonly subModelRepository: Repository<SubModel>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const subModel = await this.subModelRepository.findOne({
        where: { id: createCarDto.subModelId },
      });
      if (!subModel) {
        throw new Error('SubModel not found');
      }
      const car = this.carRepository.create(createCarDto);
      return this.carRepository.save(car);
    } catch (error) {
      console.log('Error creating car:', error);
      throw new Error('Failed to create car');
    }
  }

  async findAll(){
    try {
      return await this.carRepository.find({relations: ['subModel']});
    } catch (error) {
      console.log('Error finding all cars:', error);
      throw new Error('Failed to find all cars');
    }
  }

  async findOne(id: number){
    try {
      return await this.carRepository.findOne({ where: { id }, relations: ['subModel'] });
    } catch (error) {
      console.log('Error finding car:', error);
      throw new Error('Failed to find car');
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
      const dataToUpdate: Partial<UpdateCarDto> & { id: number } = {
        //ép type phải có id => nếu không preload bị crash
        id, // id của dataUpdate
        ...updateCarDto,
      };

      if (updateCarDto.subModelId != undefined) {
        const exists = await this.subModelRepository.findOne({
          where: { id: updateCarDto.subModelId },
        });
        if (!exists) {
          throw new Error('SubModel not found');
        }
      }

      const car = await this.carRepository.preload(dataToUpdate);
      if (!car) {
        throw new Error('Car not found');
      }
      return this.carRepository.save(car);
    } catch (error) {
      console.log('Error updating car:', error);
      throw new Error('Failed to update car');
    }
  }

  async remove(id: number) {
    try {
      const car = await this.carRepository.findOne({ where: { id } });
      if (!car) {
        throw new Error('Car not found');
      }
      return await this.carRepository.remove(car);
    } catch (error) {
      console.log('Error removing car:', error);
      throw new Error('Failed to remove car');
    }
  }
}
