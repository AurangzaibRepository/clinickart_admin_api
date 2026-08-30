import { IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class BulkProductRowDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(100, {
    message: 'Name cannot exceed 100 characters',
  })
  @Transform(({ value }) => value?.trim())
  public readonly name: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @Transform(({ value }) => value?.trim())
  public readonly description: string;

  @IsNotEmpty({ message: 'Category cannot be empty' })
  @Transform(({ value }) => value?.trim())
  public readonly category: string;

  @IsNotEmpty({ message: 'Brand cannot be empty' })
  @Transform(({ value }) => value?.trim())
  public readonly brand: string;
}
