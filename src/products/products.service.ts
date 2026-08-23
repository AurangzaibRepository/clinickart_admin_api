import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ProductListingDto } from './dto/product-listing.dto';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { CreateProductData } from './types/create-product-data.type';
import { Category } from 'src/categories/category.entity';
import { Brand } from 'src/brands/brand.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

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

  async create(data: CreateProductData): Promise<Product> {
    const brand = await this.brandRepository.findOneBy({
      id: data.brandId,
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    const category = await this.categoryRepository.findOneBy({
      id: data.categoryId,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create({
      name: data.name,
      description: data.description,
      category: { id: data.categoryId },
      brand: { id: data.brandId },
    });

    return this.productRepository.save(product);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (! product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, data);

    return this.productRepository.save(product);
  }
}
