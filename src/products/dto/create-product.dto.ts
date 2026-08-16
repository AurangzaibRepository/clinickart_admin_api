import { IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(100, { message: 'Name cannot exceed more than 100 characters' })
  @Matches('/^[a-zA-Z0-9]+$/', {
    message: 'Name can only contain numbers, letters and spaces'
  })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @Transform(({ value }) => value.trim())
  public readonly description: string;

  @IsNotEmpty()
  @Type(() => Number)
  public readonly categoryId: number;

  @IsNotEmpty()
  @Type(() => Number)
  public readonly brandId: number;
}
