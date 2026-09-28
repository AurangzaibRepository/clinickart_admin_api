import { Test, TestingModule } from '@nestjs/testing';
import { ClinicRequestsController } from './clinic-requests.controller';

describe('ClinicRequestsController', () => {
  let controller: ClinicRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicRequestsController],
    }).compile();

    controller = module.get<ClinicRequestsController>(ClinicRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
