import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRating } from './brand-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandRating])],
})
export class BrandRatingsModule {}
