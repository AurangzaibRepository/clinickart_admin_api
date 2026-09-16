import { IsNotEmpty } from 'class-validator';

export class ChangeStatusCustomerDto {
  @IsNotEmpty()
  public readonly isActive: boolean;
}
