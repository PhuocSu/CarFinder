import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { Category } from '../entities/faq.entity';

export class CreateFaqDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;

    @IsOptional()
    @IsString()
    fileAttachment?: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsBoolean()
    isTemporarySave?: boolean = false;
}