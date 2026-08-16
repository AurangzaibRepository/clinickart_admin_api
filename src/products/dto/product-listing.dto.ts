import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class ProductListingDto extends PaginationDto {
  @IsOptional()
  public readonly name?: string;

  @IsOptional()
  public readonly description?: string;
}
