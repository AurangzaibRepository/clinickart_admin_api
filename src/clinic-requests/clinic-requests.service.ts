import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicRequest } from './clinic-request.entity';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { createPagination } from 'src/common/helpers/pagination.helper';
import { ClinicRequestListingDto } from './dto/clinic-request-listing.dto';

@Injectable()
export class ClinicRequestsService {
  constructor(
    @InjectRepository(ClinicRequest)
    private readonly clinicRequestRepository: Repository<ClinicRequest>,
  ) {}

  async getListing(
    query: ClinicRequestListingDto,
  ): Promise<PaginatedResponse<ClinicRequest>> {
    const { page, limit } = query;
    const [requests, totalRecords] =
      await this.clinicRequestRepository.findAndCount({
        order: {
          name: 'ASC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      data: requests,
      meta: createPagination(page, limit, totalRecords),
    };
  }
}
