import {
  Controller,
  Get,
  Patch,
  Query,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerListingDto } from './dto/customer-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Customer } from './customer.entity';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { CustomerService } from './customer.service';
import { ChangeStatusCustomerDto } from './dto/change-status-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async listing(
    @Query() query: CustomerListingDto,
  ): Promise<PaginatedResponse<Customer>> {
    return await this.customerService.getListing(query);
  }

  @Get(':id')
  async details(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Customer>> {
    const customer = await this.customerService.getDetails(id);

    return {
      status: true,
      data: customer,
    };
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeStatusCustomerDto: ChangeStatusCustomerDto,
  ): Promise<ApiResponse> {
    await this.customerService.changeStatus(id, changeStatusCustomerDto);

    return {
      status: true,
      message: 'Customer status updated successfully',
    };
  }
}
