import { Test, TestingModule } from '@nestjs/testing';
import { AlertController } from './alert.controller.js';
import { AlertService } from './alert.service.js';
import { AlertStatus } from '../../generated/prisma/enums.js';
import { randomUUID } from 'crypto';

describe('AlertController', () => {
  let controller: AlertController;
  let service: AlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertController],
      providers: [AlertService],
    }).compile();

    controller = module.get(AlertController);
    service = module.get(AlertService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a created alert', async () => {
      const params: Parameters<typeof controller.create> = [
        {
          title: 'title',
          description: 'description',
          organizationId: randomUUID(),
          createdById: randomUUID(),
          status: AlertStatus.NEW,
        },
      ];
      const result: Awaited<ReturnType<typeof service.create>> = {
        ...params[0],
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.create(...params));
      expect(service.create).toHaveBeenCalledWith(...params);
    });
  });
});
