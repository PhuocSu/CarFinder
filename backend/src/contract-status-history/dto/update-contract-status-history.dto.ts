import { PartialType } from '@nestjs/swagger';
import { CreateContractStatusHistoryDto } from './create-contract-status-history.dto';

export class UpdateContractStatusHistoryDto extends PartialType(CreateContractStatusHistoryDto) {}
