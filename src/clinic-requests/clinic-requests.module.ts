import { Module } from '@nestjs/common';
import { ClinicRequestsController } from './clinic-requests.controller';
import { ClinicRequestsService } from './clinic-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicRequest } from './clinic-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicRequest])],
  controllers: [ClinicRequestsController],
  providers: [ClinicRequestsService],
})
export class ClinicRequestsModule {}
