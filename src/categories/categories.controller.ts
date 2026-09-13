import type { Express } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CategoryListingDto } from './dto/category-listing.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtPayload } from 'src/auth/jwt.strategy';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async listing(
    @Query() query: CategoryListingDto,
  ): Promise<PaginatedResponse<Category>> {
    return this.categoriesService.getListing(query);
  }

  @Get('all')
  async getAll() {
    const categories = await this.categoriesService.getAll();

    return {
      status: true,
      data: categories
    };
  }

  @Get(':id')
  async details(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.getDetails(id);

    return {
      status: true,
      data: category,
    };
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: JwtPayload
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.create(createCategoryDto, user);

    return {
      status: true,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.update(
      id,
      updateCategoryDto,
      user,
    );

    return {
      status: true,
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ): Promise<ApiResponse> {
    await this.categoriesService.delete(id, user);

    return {
      status: true,
      message: 'Category deactivated successfully',
    };
  }
}
