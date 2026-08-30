import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CategoryListingDto } from './dto/category-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Category } from './category.entity';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { BaseService } from 'src/common/services/base.service';
import { AuditEntityType } from 'src/audit/audit.entity';
import { AuditService } from 'src/audit/audit.service';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    auditService: AuditService,
  ) {
    super(categoryRepository, AuditEntityType.CATEGORY, auditService);
  }

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
}
