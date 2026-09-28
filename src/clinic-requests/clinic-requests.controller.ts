import { Controller, Get, Query } from '@nestjs/common';
import { ClinicRequestsService } from './clinic-requests.service';
import { ClinicRequest } from './clinic-request.entity';
import { ClinicRequestListingDto } from './dto/clinic-request-listing.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Controller('clinic-requests')
export class ClinicRequestsController {
  constructor(private readonly clinicRequestService: ClinicRequestsService) {}

  @Get()
  async listing(
    @Query() clinicRequestListingDto: ClinicRequestListingDto,
  ): Promise<PaginatedResponse<ClinicRequest>> {
    return this.clinicRequestService.getListing(clinicRequestListingDto);
  }
}
