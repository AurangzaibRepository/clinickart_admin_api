import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BrandListingDto } from './dto/brand-listing.dto';
import { Brand } from './brand.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { BaseService } from 'src/common/services/base.service';
import { AuditService } from 'src/audit/audit.service';
import { CacheService } from 'src/common/cache/cache.service';
import { AuditEntityType } from 'src/audit/audit.entity';

@Injectable()
export class BrandsService extends BaseService<Brand> {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    private readonly cacheService: CacheService,
    auditService: AuditService,
  ) {
    super(brandRepository, AuditEntityType.BRAND, auditService);
  }

  async getAll(): Promise<Brand[]> {
    const brands = await this.brandRepository.find({
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });

    return brands;
  }

  async getListing(query: BrandListingDto): Promise<PaginatedResponse<Brand>> {
    const { name, page, limit } = query;
    const [brands, totalRecords] = await this.brandRepository.findAndCount({
      where: name ? { name: Like(`%${name}%`) } : {},
      order: {
        name: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: brands,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async testCache(): Promise<string | undefined> {
    await this.cacheService.save('brand:list', 'Brand listing goes here');

    const cachedValue = await this.cacheService.get<string>('brand:list');
    console.log(cachedValue);
    return cachedValue;
  }
}
