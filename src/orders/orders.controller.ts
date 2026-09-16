import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrderListingDto } from './dto/order-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService
    ) {}

    @Get()
    async listing(@Query() orderListingDto: OrderListingDto): Promise<PaginatedResponse<Order>> {
        return await this.orderService.getListing(orderListingDto);
    }

    @Get(':id')
    async details(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Order>> {
        const order = await this.orderService.getDetails(id);
        
    return {
        status: true,
        data: order
      };
    }
}
