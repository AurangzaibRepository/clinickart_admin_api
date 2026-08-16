import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class BrandListingDto extends PaginationDto {
  @IsOptional()
  public readonly name?: string;
}
