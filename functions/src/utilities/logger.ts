import * as logger from 'firebase-functions/logger';
import { isEnvTest } from '../constants';

if (isEnvTest) {
  console.warn('🤐 Logging suppressed for test env');
}

export const debug = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.debug(...args);
};

export const info = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.info(...args);
};

export const warn = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.warn(...args);
};

export const error = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.error(...args);
};

export const critical = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.write({ severity: 'CRITICAL', ...args });
};

export const alert = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.write({ severity: 'ALERT', ...args });
};

export const emergency = (...args: any[]) => {
  if (isEnvTest) {
    return;
  }

  logger.write({ severity: 'EMERGENCY', ...args });
};
