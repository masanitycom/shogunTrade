type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = 'info';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private log(level: LogLevel, message: string, ...data: any[]) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const formattedData = data.map(item => {
        if (item instanceof Error) {
          return {
            name: item.name,
            message: item.message,
            stack: item.stack
          };
        }
        return item;
      });
      console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...formattedData);

      // In a production environment, you might want to send logs to a server
      // this.sendLogsToServer(level, message, formattedData);
    }
  }

  debug(message: string, ...data: any[]) {
    this.log('debug', message, ...data);
  }

  info(message: string, ...data: any[]) {
    this.log('info', message, ...data);
  }

  warn(message: string, ...data: any[]) {
    this.log('warn', message, ...data);
  }

  error(message: string, ...data: any[]) {
    this.log('error', message, ...data);
  }

  // This method would be implemented to send logs to a server in a production environment
  // private sendLogsToServer(level: LogLevel, message: string, data: any[]) {
  //   // Implementation for sending logs to a server
  // }
}

export const logger = Logger.getInstance();

