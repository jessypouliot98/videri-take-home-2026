import { AlertStatus } from '../../../generated/prisma/enums.js';
import { updateAlertStatusValidator } from './update-alert-status-validator.js';

describe('updateAlertStatusValidator', () => {
  it.each([
    [AlertStatus.NEW, AlertStatus.ACKNOWLEDGED],
    [AlertStatus.ACKNOWLEDGED, AlertStatus.RESOLVED],
    [AlertStatus.NEW, AlertStatus.RESOLVED],
  ])('should allow status change from %s to %s', (from, to) => {
    expect(updateAlertStatusValidator(from, to)).toBe(true);
  });
  it.each([
    [AlertStatus.RESOLVED, AlertStatus.RESOLVED],
    [AlertStatus.ACKNOWLEDGED, AlertStatus.ACKNOWLEDGED],
    [AlertStatus.NEW, AlertStatus.NEW],
    [AlertStatus.RESOLVED, AlertStatus.NEW],
    [AlertStatus.RESOLVED, AlertStatus.ACKNOWLEDGED],
    [AlertStatus.ACKNOWLEDGED, AlertStatus.NEW],
    ['RANDOM' as AlertStatus, AlertStatus.RESOLVED],
  ])('should disallow status change from %s to %s', (from, to) => {
    expect(updateAlertStatusValidator(from, to)).toBe(false);
  });
});
