import { ConsoleLogger, Logger } from '../src';

const logger = new Logger<ConsoleLogger>('AppName', {
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
logger.localInstance?.on('debug', (level, message) => {
    message = 'xddd';
    console.error(message);
});

logger.debug('Hello World!', 'SomeContext');

logger.debug('Hello World!', 'SomeContext2222222');
