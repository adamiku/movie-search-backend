import winston from 'winston';

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

export const logger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        message,
        timestamp,
        data // metadata
      };

      return JSON.stringify(response);
    })
  ),
  // store logs in the console (can be moved to a file or a db as well)
  transports: [new winston.transports.Console()]
});
