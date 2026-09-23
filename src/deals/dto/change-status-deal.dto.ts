import { IsNotEmpty } from 'class-validator';

export class ChangeStatusDealDto {
  @IsNotEmpty()
  public readonly isActive: boolean;
}
