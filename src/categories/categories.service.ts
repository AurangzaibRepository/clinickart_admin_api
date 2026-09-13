import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, DataSource } from 'typeorm';
import { CategoryListingDto } from './dto/category-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Category } from './category.entity';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { BaseService } from 'src/common/services/base.service';
import { AuditEntityType } from 'src/audit/audit.entity';
import { AuditService } from 'src/audit/audit.service';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { Product } from 'src/products/product.entity';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly dataSource: DataSource,
    auditService: AuditService,
  ) {
    super(categoryRepository, AuditEntityType.CATEGORY, auditService);
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      select: {'id': true, 'name': true},
      order: { name: 'ASC' }
    });

    return categories;
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
        order: {
          name: 'ASC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      data: categories,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async delete(id: number, user: JwtPayload): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager
        .getRepository(Product)
        .createQueryBuilder()
        .softDelete()
        .where('categoryId = :categoryId', { categoryId: id })
        .execute();

      await super.delete(id, user, manager);
    });
  }
}
