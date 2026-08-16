import { IsNotEmpty, MaxLength, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(60)
  @Transform(({ value }) => value.trim())
  public readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(60)
  @Transform(({ value }) => value.trim())
  public readonly lastName: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  @Transform(({ value }) => value.trim())
  public readonly email: string;

  @IsOptional()
  @MaxLength(80, { message: 'Phone number cannot exceed 80 characters' })
  public readonly phoneNumber;
}
