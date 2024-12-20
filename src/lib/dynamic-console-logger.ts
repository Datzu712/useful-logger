/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseLogger } from './base-console-logger';
import type { LoggerOptions, LogLevel } from '../interfaces';

export const Logger = class DynamicLogger {
    constructor(options: LoggerOptions) {
        const levels = Object.keys(options.levels) as LogLevel[];

        return new Proxy(new BaseLogger(options), {
            get(targetObject, propertyKey, proxyReceiver) {
                if (typeof propertyKey === 'string' && levels.includes(propertyKey as LogLevel)) {
                    return (...logMessages: any[]) => targetObject.defaultLogWriter(...logMessages);
                }
                return Reflect.get(targetObject, propertyKey, proxyReceiver);
            },
        });
    }
} as new <T extends LoggerOptions>(
    options: T,
) => BaseLogger<{ [K in keyof T['levels']]: (...logMessages: any[]) => void }> & {
    [K in keyof T['levels']]: (...logMessages: any[]) => void;
};

const logger = new Logger({
    levels: {
        error: {
            writeInConsole: true,
            outputFile: 'error.log',
        },
        warn: {
            writeInConsole: true,
            outputFile: 'warn.log',
        },
        log: {
            writeInConsole: true,
            outputFile: 'log.log',
        },
        xd: {
            type: 'ddd',
            writeInConsole: true,
            outputFile: 'xd.log',
        },
    },
});
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.log('This is a log message');

logger.xd('This is a xd message'); // typescript is happy 😄

logger.createContext('tst').xd('This is a xd message'); // typescript is happy 😄
// logger.debug('This is a debug message'); // typescript will throw an error here
