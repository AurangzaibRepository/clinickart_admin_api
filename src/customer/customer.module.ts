import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { AuditModule } from 'src/audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), AuditModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
