import env from "dotenv";

env.config();

const isDevelopment: boolean = !!+(process.env.IS_DEVELOPMENT || "0");

class Logger {
  public log(...params: any[]) {
    if (isDevelopment) {
      // tslint:disable-next-line no-console
      console.log(...params);
    }
  }
}

const logger = new Logger();

export { Logger, logger };
