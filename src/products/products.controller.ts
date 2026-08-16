import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductListingDto } from './dto/product-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Product } from './product.entity';
import { UploadInterceptor } from 'src/common/interceptors/upload.interceptor';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async listing(
    @Query() query: ProductListingDto,
  ): Promise<PaginatedResponse<Product>> {
    return this.productService.getListing(query);
  }

  @Post()
  @UseInterceptors(UploadInterceptor('products'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.create({
      ...createProductDto,
      image: image?.path,
    });

    return {
      status: true,
      message: 'Product created successfully',
      data: product,
    };
  }
}
