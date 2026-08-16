import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class UserListingDto extends PaginationDto {
  @IsOptional()
  public readonly name?: string;

  @IsOptional()
  public readonly email?: string;
}
