import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductListingDto } from './dto/product-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Product } from './product.entity';
import { UploadInterceptor } from 'src/common/interceptors/upload.interceptor';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtPayload } from 'src/auth/jwt.strategy';
import { ExcelUploadInterceptor } from 'src/common/interceptors/excel-upload.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async listing(
    @Query() query: ProductListingDto,
  ): Promise<PaginatedResponse<Product>> {
    return this.productService.getListing(query);
  }

  @Get(':id')
  async details(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.getDetails(id);

    return {
      status: true,
      data: product,
    };
  }

  @Post()
  @UseInterceptors(UploadInterceptor('products'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.create(
      {
        ...createProductDto,
        image: `products/${image?.filename}`,
      },
      user,
    );

    return {
      status: true,
      message: 'Product created successfully',
      data: product,
    };
  }

  @Post('bulk-upload')
  @UseInterceptors(ExcelUploadInterceptor())
  async bulkUpload(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse> {
    await this.productService.bulkUpload(file, user);

    return {
      status: true,
      message: 'Products uploaded successfully',
    };
  }

  @Put(':id')
  @UseInterceptors(UploadInterceptor('products'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.update(
      id,
      {
        ...updateProductDto,
        ...(image && { image: `products/${image?.filename}` }),
      },
      user,
    );

    return {
      status: true,
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ): Promise<ApiResponse> {
    await this.productService.delete(id, user);

    return {
      status: true,
      message: 'Product deactivated successfully',
    };
  }
}
