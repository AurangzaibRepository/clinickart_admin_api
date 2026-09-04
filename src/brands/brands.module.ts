import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), CacheModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
