import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFavoriteCarDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    
    @IsNumber()
    @IsNotEmpty()
    carId: number;
}
