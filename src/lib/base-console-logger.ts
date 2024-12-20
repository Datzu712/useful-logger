/* eslint-disable @typescript-eslint/no-explicit-any */

import type { LoggerOptions } from '../interfaces';

export class BaseLogger {
    constructor(private options: LoggerOptions) {}

    public defaultLogWriter(...messages: any[]) {
        console.log(messages);
    }
}
