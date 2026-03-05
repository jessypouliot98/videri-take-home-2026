import { Test, TestingModule } from '@nestjs/testing';
import { AlertsController } from './alerts.controller.js';
import { AlertsService } from './alerts.service.js';
import { AlertStatus } from '../../generated/prisma/enums.js';
import { randomUUID } from 'crypto';

describe('AlertController', () => {
  let controller: AlertsController;
  let service: AlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertsController],
      providers: [AlertsService],
    }).compile();

    controller = module.get(AlertsController);
    service = module.get(AlertsService);
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

  describe('findPage', () => {
    it('should return paginated result', async () => {
      const params: Parameters<typeof controller.findPage> = [
        {
          page: 1,
          size: 10,
          status: 'NEW',
        },
      ];
      const results: Awaited<ReturnType<typeof service.findPage>> = {
        items: [],
        prevPage: null,
        nextPage: 2,
      };
      jest
        .spyOn(service, 'findPage')
        .mockImplementation(() => Promise.resolve(results));

      expect(await controller.findPage(...params));
      expect(service.findPage).toHaveBeenCalledWith(...params);
    });
  });
});
