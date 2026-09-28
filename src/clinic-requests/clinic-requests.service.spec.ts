import { Test, TestingModule } from '@nestjs/testing';
import { ClinicRequestsService } from './clinic-requests.service';

describe('ClinicRequestsService', () => {
  let service: ClinicRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicRequestsService],
    }).compile();

    service = module.get<ClinicRequestsService>(ClinicRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
