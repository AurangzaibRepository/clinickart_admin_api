import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './deal.entity';
import { DealTag } from 'src/deal-tags/deal-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, DealTag])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
