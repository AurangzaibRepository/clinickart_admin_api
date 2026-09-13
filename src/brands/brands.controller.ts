import type { Express } from 'express';
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
  UseInterceptors,
} from '@nestjs/common';
import { BrandListingDto } from './dto/brand-listing.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtPayload } from 'src/auth/jwt.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadInterceptor } from 'src/common/interceptors/upload.interceptor';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get('test-cache')
  async testCache(): Promise<string | undefined> {
    return await this.brandService.testCache();
  }

  @Get('all')
  async getAll() {
    const brands = await this.brandService.getAll();

    return {
      status: true,
      data: brands,
    };
  }

  @Get()
  async listing(
    @Query() query: BrandListingDto,
  ): Promise<PaginatedResponse<Brand>> {
    return this.brandService.getListing(query);
  }

  @Get(':id')
  async details(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.getDetails(id);

    return {
      status: true,
      data: brand,
    };
  }

  @Post()
  @UseInterceptors(UploadInterceptor('brands'))
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.create(
      {
        ...createBrandDto,
        logo: `brands/${image?.filename}`,
      },
      user,
    );

    return {
      status: true,
      message: 'Brand created successfully',
      data: brand,
    };
  }

  @Put(':id')
  @UseInterceptors(UploadInterceptor('brands'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.update(
      id,
      {
        ...updateBrandDto,
        ...(image && { logo: `brands/${image?.filename}` }),
      },
      user,
    );

    return {
      status: true,
      message: 'Brand updated successfully',
      data: brand,
    };
  }
}
