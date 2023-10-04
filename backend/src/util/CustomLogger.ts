import * as log4js from "log4js";
import { getLogger, Logger } from "log4js";

export class CustomLogger {
  private static logger: Logger;

  static getCustomLogger(): Logger {
    if (!CustomLogger.logger) {
      log4js.configure({
        appenders: {
          console: {
            type: "console",
            layout: {
              type: "basic",
            },
          },
        },
        categories: {
          default: {
            appenders: ["console"],
            level: process.env.LOG_LEVEL || "info",
          },
        },
      });

      CustomLogger.logger = getLogger();
    }

    return CustomLogger.logger;
  }
}
