import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserListingDto } from './dto/user-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { CreateUserDto } from './dto/create-user.to';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getListing(query: UserListingDto): Promise<PaginatedResponse<User>> {
    const { name, email, page, limit } = query;
    const [users, totalRecords] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async getDetails(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }
}
