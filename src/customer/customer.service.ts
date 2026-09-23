import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerListingDto } from './dto/customer-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { BaseService } from 'src/common/services/base.service';
import { AuditService } from 'src/audit/audit.service';
import { AuditEntityType } from 'src/audit/audit.entity';
import { ChangeStatusCustomerDto } from './dto/change-status-customer.dto';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    auditService: AuditService,
  ) {
    super(customerRepository, AuditEntityType.CUSTOMER, auditService);
  }

  async getListing(
    query: CustomerListingDto,
  ): Promise<PaginatedResponse<Customer>> {
    const { name, page, limit } = query;
    const [customers, totalRecords] =
      await this.customerRepository.findAndCount({
        where: name
          ? [{ firstName: Like(`%${name}%`) }, { lastName: Like(`%${name}%`) }]
          : {},
        order: {
          firstName: 'ASC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      data: customers,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async changeStatus(id: number, data: ChangeStatusCustomerDto): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    customer.isActive = data.isActive;
    await this.customerRepository.save(customer);
  }
}
