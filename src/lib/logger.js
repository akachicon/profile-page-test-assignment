export const levels = {
  INFO: Symbol(),
  ERROR: Symbol(),
};

const levelMap = {
  [levels.INFO]: 'info',
  [levels.ERROR]: 'error',
};

class Logger {
  constructor({ defaultLevel } = {}) {
    if (!Object.values(levels).includes(defaultLevel)) {
      this.defaultLevel = levels.INFO;
    }
  }

  getNormalizedArgs(level, message) {
    if (Object.values(levels).includes(level)) {
      return {
        level,
        message,
      };
    }

    return {
      level: this.defaultLevel,
      message: level,
    };
  }

  format({ level, message }) {
    return `[${levelMap[level].toUpperCase()}]: ${message}`;
  }

  getLog(level, message) {
    const normalizedArgs = this.getNormalizedArgs(level, message);
    return this.format(normalizedArgs);
  }
}

export class ServerLogger extends Logger {
  constructor(options) {
    super(options);
  }

  log(level, message) {
    const logString = this.getLog(level, message);
    console.log('server:', logString);
  }
}

export class ClientLogger extends Logger {
  constructor(options) {
    super(options);
  }

  log(level, message) {
    const logString = this.getLog(level, message);
    console.log('client:', logString);
  }
}

const logger = __IS_SERVER__ ? new ServerLogger() : new ClientLogger();

export default logger;
