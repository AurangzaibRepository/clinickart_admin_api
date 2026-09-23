import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { JwtPayload } from 'src/auth/jwt.strategy';
import { Deal } from './deal.entity';
import { DealListingDto } from './dto/deal-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { BaseService } from 'src/common/services/base.service';
import { AuditService } from 'src/audit/audit.service';
import { AuditEntityType } from 'src/audit/audit.entity';
import { NotFoundException } from '@nestjs/common';
import { DealTag } from 'src/deal-tags/deal-tag.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ChangeStatusCustomerDto } from 'src/customer/dto/change-status-customer.dto';

@Injectable()
export class DealsService extends BaseService<Deal> {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,

    @InjectRepository(DealTag)
    private readonly dealTagRepository: Repository<DealTag>,

    auditService: AuditService,
  ) {
    super(dealRepository, AuditEntityType.CUSTOMER, auditService);
  }

  async getListing(query: DealListingDto): Promise<PaginatedResponse<Deal>> {
    const { page, limit } = query;
    const [deals, totalRecords] = await this.dealRepository.findAndCount({
      relations: {
        dealTags: true,
      },
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const dealsResponse = deals.map((deal) => ({
      ...deal,
      tags: deal.dealTags.map((tag) => tag.name).join(', '),
    }));

    return {
      data: dealsResponse,
      meta: createPagination(page, limit, totalRecords),
    };
  }

  async getDetail(id: number) {
    const deal = await this.dealRepository.findOne({
      where: { id },
      relations: {
        dealTags: true,
      },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    return {
      ...deal,
      tags: deal.dealTags.map((tag) => tag.name).join(', '),
    };
  }

  async create(data: CreateDealDto & { image?: string }, user: JwtPayload) {
    const { tags, ...dealData } = data;

    const deal = await this.dealRepository.save({
      ...dealData,
    });

    if (tags?.length) {
      const dealTags = tags.map((tag) =>
        this.dealTagRepository.create({
          name: tag.trim(),
          deal,
        }),
      );

      await this.dealTagRepository.save(dealTags);
    }

    return deal;
  }

  async updateRecord(
    id: number,
    data: UpdateDealDto & { image?: string },
    user: JwtPayload,
  ) {
    const { tags, ...dealData } = data;

    const deal = await this.dealRepository.findOne({
      where: { id },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    // Update deal
    await this.dealRepository.update(id, dealData);

    // Update tags
    if (tags !== undefined) {
      await this.dealTagRepository.delete({
        deal: { id },
      });

      if (tags.length) {
        const dealTags = tags.map((tag) =>
          this.dealTagRepository.create({
            name: tag.trim(),
            deal: deal,
          }),
        );

        await this.dealTagRepository.save(dealTags);
      }
    }

    return this.dealRepository.findOne({
      where: { id },
      relations: {
        dealTags: true,
      },
    });
  }

  async changeStatus(id: number, data: ChangeStatusCustomerDto): Promise<void> {
    const deal = await this.dealRepository.findOneBy({ id });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    deal.isActive = data.isActive;
    await this.dealRepository.save(deal);
  }
}
