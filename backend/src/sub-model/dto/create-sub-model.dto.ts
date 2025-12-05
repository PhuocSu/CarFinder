import {IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateSubModelDto {
    @IsNotEmpty()
    @IsString()
    subModelName: string;

    @IsNotEmpty()
    @Min(1, { message: 'SubModel ID must be a positive number' })
    @IsInt()
    modelId: number;
}
