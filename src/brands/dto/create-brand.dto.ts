import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  description: string;
}
