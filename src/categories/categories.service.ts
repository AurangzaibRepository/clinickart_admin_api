import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CategoryListingDto } from './dto/category-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Category } from './category.entity';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CreateCategoryData } from './types/create-category-data.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getListing(
    query: CategoryListingDto,
  ): Promise<PaginatedResponse<Category>> {
    const { text, page, limit } = query;
    const where = text
      ? [{ name: Like(`%${text}%`) }, { description: Like(`%${text}%`) }]
      : {};

    const [categories, totalRecords] =
      await this.categoryRepository.findAndCount({
        where,
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      data: categories,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async getDetails(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
        id
    });

    if (!category) {
        throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(data: CreateCategoryData): Promise<Category> {
    const category = this.categoryRepository.create(data);

    return this.categoryRepository.save(category);
  }
}
