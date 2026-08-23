import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BrandListingDto } from './dto/brand-listing.dto';
import { Brand } from './brand.entity';
import { CreateBrandData, UpdateBrandData } from './types/create-brand-data.type';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

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

  async getDetails(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({
      id,
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async create(data: CreateBrandData): Promise<Brand> {
    const brand = this.brandRepository.create(data);

    return this.brandRepository.save(brand);
  }

  async update(id: number, data: UpdateBrandData): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id });

    if (! brand) {
      throw new NotFoundException('Brand not found');
    }

    Object.assign(brand, data);

    return this.brandRepository.save(brand);
  }
}
