import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { CacheModule } from '../common/cache/cache.module';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), CacheModule, AuditModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
