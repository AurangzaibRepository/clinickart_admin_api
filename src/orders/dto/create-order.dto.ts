import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  public readonly totalPrice: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  public readonly summary: string;
}
