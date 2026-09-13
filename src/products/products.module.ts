import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';
import { Brand } from 'src/brands/brand.entity';
import { ExcelModule } from 'src/common/excel/excel.module';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Brand]),
    ExcelModule,
    AuditModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
