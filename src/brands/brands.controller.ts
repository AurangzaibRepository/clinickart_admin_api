import { Express } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  Body,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandListingDto } from './dto/brand-listing.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  async listing(
    @Query() query: BrandListingDto,
  ): Promise<PaginatedResponse<Brand>> {
    return this.brandService.getListing(query);
  }

  @Get(':id')
  async details(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.getDetails(id);

    return {
      status: true,
      data: brand
    };
  }

  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.create({
      ...CreateCategoryDto,
      image: image?.path,
    });

    return {
      status: true,
      message: 'Brand created successfully',
      data: brand,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<string> {
    return `Brand ${id} update`;
  }
}
