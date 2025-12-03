import { Injectable } from '@nestjs/common';
import { CreateSubModelDto } from './dto/create-sub-model.dto';
import { UpdateSubModelDto } from './dto/update-sub-model.dto';

@Injectable()
export class SubModelService {
  create(createSubModelDto: CreateSubModelDto) {
    return 'This action adds a new subModel';
  }

  findAll() {
    return `This action returns all subModel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subModel`;
  }

  update(id: number, updateSubModelDto: UpdateSubModelDto) {
    return `This action updates a #${id} subModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} subModel`;
  }
}
