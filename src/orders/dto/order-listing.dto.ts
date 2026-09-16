import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class OrderListingDto extends PaginationDto {
  @IsOptional()
  public readonly orderNumber?: string;

  @IsOptional()
  public readonly customerId?: number;
}
