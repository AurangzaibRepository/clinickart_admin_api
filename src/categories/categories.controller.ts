import { Express } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UploadInterceptor } from 'src/common/interceptors/upload.interceptor';

@Controller('categories')
export class CategoriesController {
  @Get()
  async listing(@Query('name') name: string): Promise<string> {
    return `Category ${name} listing`;
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<string> {
    return `Category ${id}`;
  }

  @Post()
  @UseInterceptors(UploadInterceptor('categories'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<string> {
    return image.path;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<string> {
    return `Category ${id} updated`;
  }
}
