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
) => BaseLogger & {
    [K in keyof T['levels']]: (...logMessages: any[]) => void;
};
