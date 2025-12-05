import { Module } from '@nestjs/common';
import { SubModelService } from './sub-model.service';
import { SubModelController } from './sub-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubModel } from './entities/sub-model.entity';
import { Model } from 'src/model/entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubModel, Model])],
  controllers: [SubModelController],
  providers: [SubModelService],
  exports: [SubModelService],
})
export class SubModelModule {}
