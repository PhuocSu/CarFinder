import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    subTitle: string

    @IsNotEmpty()
    fileAttachment: string

    @IsNotEmpty()
    startDate: Date

    @IsNotEmpty()
    endDate: Date

    @IsNotEmpty()
    content: string

    @IsOptional()
    isTemporarySave?: boolean = false

}