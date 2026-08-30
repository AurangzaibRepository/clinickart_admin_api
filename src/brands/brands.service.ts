import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BrandListingDto } from './dto/brand-listing.dto';
import { Brand } from './brand.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { BaseService } from 'src/common/services/base.service';
import { AuditService } from 'src/audit/audit.service';
import { AuditEntityType } from 'src/audit/audit.entity';

@Injectable()
export class BrandsService extends BaseService<Brand> {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    auditService: AuditService,
  ) {
    super(brandRepository, AuditEntityType.BRAND, auditService);
  }

  async getListing(query: BrandListingDto): Promise<PaginatedResponse<Brand>> {
    const { name, page, limit } = query;
    const [brands, totalRecords] = await this.brandRepository.findAndCount({
      where: name ? { name: Like(`%${name}%`) } : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: brands,
      meta: createPagination(page, limit, totalRecords),
    };
  }
}
