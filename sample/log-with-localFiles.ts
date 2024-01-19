import { Logger } from "../src";

const logger = new Logger('AppName', {
    logLevels: ['debug', 'error', 'warn', 'verbose', 'log'],
    folderPath: './logs',
    allowConsole: ['warn', 'error', 'debug', 'log'],
    allowWriteFiles: true,
    outputTemplate: '{pid} {timestamp} - {level} {context} {message}',
    indents: {
        level: 7,
        context: 20,
    },
});

logger.debug('Hello World!', 'SomeContext');

logger.debug('Hello World!', 'SomeContext2222222');