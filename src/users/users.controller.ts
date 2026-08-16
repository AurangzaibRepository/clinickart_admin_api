import { Controller, Get, Query } from '@nestjs/common';
import { User } from './user.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { UsersService } from './users.service';
import { UserListingDto } from './dto/user-listing.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async listing(
    @Query() query: UserListingDto,
  ): Promise<PaginatedResponse<User>> {
    return this.userService.getListing(query);
  }
}
