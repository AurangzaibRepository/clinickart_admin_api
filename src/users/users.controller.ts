import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from './user.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { UsersService } from './users.service';
import { UserListingDto } from './dto/user-listing.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CreateUserDto } from './dto/create-user.to';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async listing(
    @Query() query: UserListingDto,
  ): Promise<PaginatedResponse<User>> {
    return this.userService.getListing(query);
  }

  @Get(':id')
  async details(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<User>> {
    const user = await this.userService.getDetails(id);

    return {
      status: true,
      data: user,
    };
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.userService.create(createUserDto);

    return {
      status: true,
      message: 'User created successfully',
      data: user,
    };
  }
}
