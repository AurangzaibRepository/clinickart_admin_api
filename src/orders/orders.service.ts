import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderListingDto } from './dto/order-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getListing(query: OrderListingDto): Promise<PaginatedResponse<Order>> {
    const { orderNumber, customerId, page, limit } = query;
    const where: FindOptionsWhere<Order> = {};

    if (orderNumber) {
      where.orderNumber = Like(`%${orderNumber}%`);
    }

    if (customerId) {
      where.customer = {
        id: customerId,
      };
    }

    const [orders, totalRecords] = await this.orderRepository.findAndCount({
      where,
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        customer: true,
      },
      select: {
        id: true,
        orderNumber: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        customer: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });

    return {
      data: orders,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async getDetails(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        orderItems: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
