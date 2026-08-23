import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty({ message: 'Email caanot be empty' })
  @Transform(({ value }) => value.trim())
  public readonly email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Transform(({ value }) => value.trim())
  public readonly password: string;
}
