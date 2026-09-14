import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerListingDto } from './dto/customer-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Customer } from './customer.entity';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('customer')
export class CustomerController {

    @Get()
    async listing(
        @Query query: CustomerListingDto
    ): Promise<PaginatedResponse<Customer>> {
    }

    @Get(':id')
    async details(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Customer>> {
        
    }
}
