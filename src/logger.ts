import * as winston from 'winston';

const customFormat = winston.format.printf(({ timestamp, level, message, context }) => {
  const pid = process.pid;
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  return `[Nest] ${pid}  - ${formattedTimestamp}     ${level.toUpperCase()} [${context || 'Application'}] ${message}`;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        customFormat
      ),
    }),
    new winston.transports.File({
      filename: 'logs/logs.log',
      format: winston.format.combine(
        winston.format.uncolorize(), // This will remove color codes for file output
        customFormat
      ),
    }),
  ],
});
