import { Test, TestingModule } from '@nestjs/testing';
import { AlertController } from './alert.controller.js';
import { AlertService } from './alert.service.js';

describe('AlertController', () => {
  let controller: AlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertController],
      providers: [AlertService],
    }).compile();

    controller = module.get<AlertController>(AlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
