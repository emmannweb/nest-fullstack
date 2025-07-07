import { Test, TestingModule } from '@nestjs/testing';
import { SignoutService } from './signout.service';

describe('SignoutService', () => {
  let service: SignoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignoutService],
    }).compile();

    service = module.get<SignoutService>(SignoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
