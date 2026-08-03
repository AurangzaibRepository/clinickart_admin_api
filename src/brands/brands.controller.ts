import { Controller, Get, Post, Put, Query, Param, Body } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  @Get()
  async listing(@Query('name') name: string): Promise<string> {
    return 'Brand listing here';
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<string> {
    return `Brand ${id}`;
  }

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto): Promise<string> {
    return 'Brand created';
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<string> {
    return `Brand ${id} update`;
  }
}
