import {
  Controller,
  Get,
  Body,
  Query,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe, UploadedFile } from '@nestjs/common';
import type { JwtPayload } from 'src/auth/jwt.strategy';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { DealsService } from './deals.service';
import { DealListingDto } from './dto/deal-listing.dto';
import { CreateDealDto } from './dto/create-deal.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { UploadInterceptor } from 'src/common/interceptors/upload.interceptor';
import { Deal } from './deal.entity';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ChangeStatusDealDto } from './dto/change-status-deal.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealService: DealsService) {}

  @Get()
  async listing(
    @Query() query: DealListingDto,
  ): Promise<PaginatedResponse<Deal>> {
    return await this.dealService.getListing(query);
  }

  @Get(':id')
  async details(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Deal>> {
    const customer = await this.dealService.getDetails(id);

    return {
      status: true,
      data: customer,
    };
  }

  @Post()
  @UseInterceptors(UploadInterceptor('deals'))
  async create(
    @Body() createDealDto: CreateDealDto,
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse<Deal>> {
    const deal = await this.dealService.create(
      {
        ...createDealDto,
        image: `deals/${image?.filename}`,
      },
      user,
    );

    return {
      status: true,
      message: 'Deal created successfully',
      data: deal,
    };
  }

  @Put(':id')
  @UseInterceptors(UploadInterceptor('deals'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDealDto: UpdateDealDto,
    @CurrentUser() user: JwtPayload,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ApiResponse> {
    const deal = await this.dealService.updateRecord(id, {
      ...updateDealDto,
      ...(image && { image: `deals/${image?.filename}` }),
    });

    return {
      status: true,
      message: 'Deal updated successfully',
    };
  }

  @Put(':id/status')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeStatusDealDto: ChangeStatusDealDto,
  ): Promise<ApiResponse> {
    await this.dealService.changeStatus(id, changeStatusDealDto);

    return {
      status: true,
      message: 'Deal status updated successfully',
    };
  }
}
