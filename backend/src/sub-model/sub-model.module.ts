import { Module } from '@nestjs/common';
import { SubModelService } from './sub-model.service';
import { SubModelController } from './sub-model.controller';

@Module({
  controllers: [SubModelController],
  providers: [SubModelService],
})
export class SubModelModule {}
