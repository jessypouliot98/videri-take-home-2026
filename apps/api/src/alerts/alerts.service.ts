import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma/index.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';
import { AlertDto } from './dto/alert.dto.js';
import { GetAlertsQueryDto } from './dto/get-alerts-query.dto.js';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto.js';
import { AlertEventDto } from './dto/alert-event.dto.js';
import { AlertStatus, Prisma } from '../../generated/prisma/client.js';
import { isNotNil } from '../../lib/ts-utils/is-not-nil.js';
import { GetAlertsPageDto } from './dto/get-alerts-page.dto.js';
import { AppHttpError } from '../../lib/nest/errors/app-http-error.js';

@Injectable()
export class AlertsService {
  async createAlert(
    createdById: string,
    organizationId: string,
    dto: CreateAlertDto,
  ): Promise<AlertDto> {
    return prisma.alert.create({
      data: {
        title: dto.title,
        status: dto.status,
        organizationId: organizationId,
        createdById: createdById,
      },
    });
  }

  async getAlertsPage(
    organizationId: string,
    { status, cursor }: GetAlertsQueryDto,
  ): Promise<GetAlertsPageDto> {
    const items = await prisma.$queryRaw<AlertDto[]>`
      SELECT *
      FROM "Alert"
      WHERE ${Prisma.join(
        [
          Prisma.sql`"organizationId" = ${organizationId}`,
          status && Prisma.sql`"status" = ${status}`,
          cursor &&
            Prisma.sql`
            ("Alert"."createdAt", "Alert"."id")
            ${Prisma.raw(cursor.mode === 'next' ? '<' : '>')}
            (
              SELECT "createdAt", "id"
              FROM "Alert" a
              WHERE "a"."id" = ${cursor.value}
            )
          `,
        ].filter(isNotNil),
        '\tAND ',
      )}
      ORDER BY
        "Alert"."createdAt" DESC,
        "Alert"."id" DESC
      LIMIT 2
    `;

    const prevCursor = items.at(0)?.id ?? cursor?.value;
    const nextCursor = items.at(-1)?.id ?? cursor?.value;

    console.log({ prevCursor });

    return {
      prevCursor: prevCursor ? `prev:${prevCursor}` : null,
      nextCursor: nextCursor ? `next:${nextCursor}` : null,
      items,
    };
  }

  async findAlert(
    alertId: string,
    organizationId: string,
  ): Promise<AlertDto | null> {
    return prisma.alert.findFirst({
      where: {
        id: alertId,
        organizationId,
      },
    });
  }

  async updateAlertStatus(
    alertId: string,
    createdById: string,
    organizationId: string,
    dto: UpdateAlertStatusDto,
  ): Promise<AlertDto> {
    return prisma.$transaction(async (tx) => {
      const prevAlert = await tx.alert.findFirstOrThrow({
        where: {
          id: alertId,
          organizationId,
        },
        select: {
          status: true,
        },
      });
      if (!canUpdateAlertStatus(prevAlert.status, dto.status)) {
        throw new UpdateAlertStatusError(prevAlert.status, dto.status);
      }
      const alert = await tx.alert.update({
        where: { id: alertId },
        data: { status: dto.status },
      });
      await tx.alertEvent.create({
        data: {
          alertId,
          createdById,
          fromStatus: prevAlert.status,
          toStatus: alert.status,
        },
      });
      return alert;
    });
  }

  async getAlertEvents(
    alertId: string,
    organizationId: string,
  ): Promise<AlertEventDto[]> {
    return prisma.alertEvent.findMany({
      where: {
        alert: {
          id: alertId,
          organizationId: organizationId,
        },
      },
    });
  }
}

const STATUS_VALUE = {
  NEW: 1,
  ACKNOWLEDGED: 2,
  RESOLVED: 3,
} satisfies Record<AlertDto['status'], number>;

function canUpdateAlertStatus(from: AlertStatus, to: AlertStatus): boolean {
  return STATUS_VALUE[from] < STATUS_VALUE[to];
}

class UpdateAlertStatusError extends AppHttpError {
  constructor(
    private from: AlertStatus,
    private to: AlertStatus,
  ) {
    super();
  }

  buildMessage() {
    return `Cannot update alert status from ${this.from} to ${this.to}`;
  }

  toNestHttpException() {
    return new BadRequestException(this.buildMessage());
  }
}
