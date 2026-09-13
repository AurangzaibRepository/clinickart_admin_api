import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
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
import { BulkProductRowDto } from './dto/bulk-product-row.dto';

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
      relations: {
        category: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: {
          id: true,
          name: true,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: products,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async getDetails(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        brand: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        category: {
          id: true,
        },
        brand: {
          id: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(data: CreateProductData, user: JwtPayload): Promise<Product> {
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

  async bulkUpload(file: Express.Multer.File, user: JwtPayload) {
    const validationErrors: Record<string, any>[] = [];
    let brandNames: string[] = [];
    let categoryNames: string[] = [];
    let productNames: string[] = [];
    const seenProductNames = new Set<string>();
    const rows = this.excelService.read(file);

    // Row limits
    if (rows.length < 1 || rows.length > 1000) {
      throw new BadRequestException('Product rows can be between 1 and 1000');
    }

    // Iterate through rows to validate
    for (let index = 0; index < rows.length; index++) {
      // Validate as per dto decorators
      const dto = plainToInstance(BulkProductRowDto, rows[index]);
      const errors = await validate(dto);

      if (errors.length > 0) {
        validationErrors.push({
          row: index + 1,
          errors,
        });

        continue;
      }

      // Duplicate check
      const productName = dto.name.toLocaleLowerCase();
      if (seenProductNames.has(productName)) {
        validationErrors.push({
          row: index + 1,
          message: `Duplicate product ${productName}`,
        });
      } else {
        seenProductNames.add(productName);
      }

      // Brand and category names
      brandNames.push(dto.brand.toLocaleLowerCase());
      categoryNames.push(dto.category.toLocaleLowerCase());
      productNames.push(dto.name.toLocaleLowerCase());
    }

    // throw validation errors
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        message: 'Excel validation failed',
        errors: validationErrors,
      });
    }

    // Get unique brands and categories
    brandNames = [...new Set(brandNames)];
    categoryNames = [...new Set(categoryNames)];
    productNames = [...new Set(productNames)];

    // Get all matching brands in database
    let brands = await this.brandRepository
      .createQueryBuilder('brand')
      .where('LOWER(brand.name) IN (:...names)', {
        names: brandNames,
      })
      .getMany();

    /*
    // Find missing brands
    const existingBrandNames = new Set(
      brands.map((brand) => brand.name.toLocaleLowerCase()),
    );

    const missingBrandNames = brandNames.filter(
      (name) => !existingBrandNames.has(name),
    ); */

    // Get all matching categories in database
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('LOWER(category.name) IN (:...names)', {
        names: categoryNames,
      })
      .getMany();

    /*
    // Find missing categories
    const existingCategoryNames = new Set(
      categories.map((category) => category.name.toLocaleLowerCase()),
    );

    const missingCategoryNames = categoryNames.filter(
      (name) => !existingCategoryNames.has(name),
    );

    // Get products from database
    const existingProducts = await this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) IN (:...names)', {
        names: productNames,
      })
      .getMany();

    const existingProductNames = new Set(
      existingProducts.map((product) => product.name.toLocaleLowerCase()),
    );

    const missingBrandNamesSet = new Set(missingBrandNames);
    const missingCategoryNamesSet = new Set(missingCategoryNames);

    // Loop to get row number for missing brands and categories
    for (let index = 0; index < rows.length; index++) {
      const dto = plainToInstance(BulkProductRowDto, rows[index]);
      const brandName = dto.brand.toLocaleLowerCase();
      const categoryName = dto.category.toLocaleLowerCase();

      if (missingBrandNamesSet.has(brandName)) {
        validationErrors.push({
          row: index + 1,
          message: `Brand ${brandName} does not exist`,
        });
      }

      if (missingCategoryNamesSet.has(categoryName)) {
        validationErrors.push({
          row: index + 1,
          message: `Category ${categoryName} does not exist`,
        });
      }

      if (existingProductNames.has(dto.name.toLocaleLowerCase())) {
        validationErrors.push({
          row: index + 1,
          message: `Product ${dto.name} already exists`,
        });
      }
    }

    // throw validation errors
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        message: 'Excel validation failed',
        errors: validationErrors,
      });
    } */

    const brandMap = new Map(
      brands.map((brand) => [brand.name.toLowerCase(), brand]),
    );

    const categoryMap = new Map(
      categories.map((category) => [category.name.toLowerCase(), category]),
    );

    const newBrands = rows
      .map((row) => plainToInstance(BulkProductRowDto, row).brand)
      .filter((name) => !brandMap.has(name.toLowerCase()))
      .filter(
        (name, index, names) =>
          names.findIndex(
            (item) => item.toLowerCase() === name.toLowerCase(),
          ) === index,
      )
      .map((name) =>
        this.brandRepository.create({
          name,
          description: name,
        }),
      );

    if (newBrands.length > 0) {
      const savedBrands = await this.brandRepository.save(newBrands);

      savedBrands.forEach((brand) => {
        brandMap.set(brand.name.toLowerCase(), brand);
      });
    }

    const newCategories = rows
      .map((row) => plainToInstance(BulkProductRowDto, row).category)
      .filter((name) => !categoryMap.has(name.toLowerCase()))
      .filter(
        (name, index, names) =>
          names.findIndex(
            (item) => item.toLowerCase() === name.toLowerCase(),
          ) === index,
      )
      .map((name) =>
        this.categoryRepository.create({
          name,
          description: name,
        }),
      );

    if (newCategories.length > 0) {
      const saveCategories = await this.categoryRepository.save(newCategories);

      saveCategories.forEach((category) => {
        categoryMap.set(category.name.toLowerCase(), category);
      });
    }

    // Save products
    const products = rows.map((row) => {
      const dto = plainToInstance(BulkProductRowDto, row);

      return this.productRepository.create({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        brand: brandMap.get(dto.brand.toLowerCase()),
        category: categoryMap.get(dto.category.toLowerCase()),
      });
    });

    await this.productRepository.save(products);
  }
}
