import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ProductListingDto } from './dto/product-listing.dto';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { Category } from 'src/categories/category.entity';
import { Brand } from 'src/brands/brand.entity';
import { BaseService } from 'src/common/services/base.service';
import { AuditEntityType } from 'src/audit/audit.entity';
import { AuditService } from 'src/audit/audit.service';
import { ExcelService } from 'src/common/excel/excel.service';
import {
  CreateProductData,
  UpdateProductData,
} from './types/create-product-data.type';
import { JwtPayload } from 'src/auth/jwt.strategy';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly excelService: ExcelService,
    auditService: AuditService,
  ) {
    super(productRepository, AuditEntityType.PRODUCT, auditService);
  }

  async getListing(
    query: ProductListingDto,
  ): Promise<PaginatedResponse<Product>> {
    const { name, page, limit } = query;
    const [products, totalRecords] = await this.productRepository.findAndCount({
      where: name ? { name: Like(`%${name}%`) } : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: products,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async getDetails(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(data: CreateProductData, user: JwtPayload) {
    const { brandId, categoryId, ...rest } = data;
    const transformedData = {
      ...rest,
      brand: { id: data.brandId },
      category: { id: data.categoryId },
    };

    return super.create(transformedData, user);
  }

  async update(id: number, data: UpdateProductData, user: JwtPayload) {
    const { brandId, categoryId, ...rest } = data;
    const transformedData = {
      ...rest,
      ...(brandId !== undefined && {
        brand: { id: brandId },
      }),
      ...(categoryId !== undefined && {
        category: { id: categoryId },
      }),
    };

    const audit = {
      data: {
        ...rest,
        ...(brandId !== undefined && { brandId }),
        ...(categoryId !== undefined && { categoryId }),
      },
      fieldMap: {
        brandId: 'brand',
        categoryId: 'category',
      },
    };

    return super.update(
      id,
      transformedData,
      user,
      {
        brand: true,
        category: true,
      },
      audit,
    );
  }
}
