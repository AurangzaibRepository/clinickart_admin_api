import { IsNotEmpty, MaxLength, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDealDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @Transform(({ value }) => value.trim())
  public readonly description: string;

  @IsOptional()
  @IsArray()
  @MaxLength(30, {
    each: true,
    message: 'Each tag cannot exceed 30 characters',
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  public readonly tags?: string[];
}
