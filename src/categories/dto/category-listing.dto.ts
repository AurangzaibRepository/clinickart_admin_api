import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CategoryListingDto extends PaginationDto {
  @IsOptional()
  public readonly text?: string;
}
