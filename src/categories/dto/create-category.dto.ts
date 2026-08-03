import { IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    image?: string;
}