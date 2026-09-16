import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from 'src/audit/audit.module';
import { Order } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), AuditModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
