import { PartialType } from '@nestjs/swagger';
import { CreateSubModelDto } from './create-sub-model.dto';

export class UpdateSubModelDto extends PartialType(CreateSubModelDto) {}
