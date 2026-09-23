import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './deal.entity';
import { DealTag } from 'src/deal-tags/deal-tag.entity';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, DealTag]), AuditModule],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
