import { AlertStatus } from '../../../generated/prisma/enums.js';

const STATUS_ORDER = [
  AlertStatus.NEW,
  AlertStatus.ACKNOWLEDGED,
  AlertStatus.RESOLVED,
] as const;

export function updateAlertStatusValidator(
  from: AlertStatus,
  to: AlertStatus,
): boolean {
  if (!STATUS_ORDER.includes(from) || !STATUS_ORDER.includes(to)) {
    return false;
  }
  return STATUS_ORDER.indexOf(from) < STATUS_ORDER.indexOf(to);
}

export class UpdateAlertStatusValidatorError extends Error {
  public from: AlertStatus;
  public to: AlertStatus;
  constructor(from: AlertStatus, to: AlertStatus) {
    super(
      `New status (${to}) is required to be higher than previous status (${from})`,
    );
    this.from = from;
    this.to = to;
  }
}
