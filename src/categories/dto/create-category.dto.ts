import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @Transform(({ value }) => value.trim())
  public readonly description: string;
}
