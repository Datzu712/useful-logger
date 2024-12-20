/* eslint-disable @typescript-eslint/no-explicit-any */

import type { LoggerOptions } from '../interfaces';

export class BaseLogger<K extends { [x: string]: (...args: any) => void }> {
    constructor(private options: LoggerOptions) {}

    public defaultLogWriter(...messages: any[]) {
        console.log(messages);
    }

    public createContext(context: string): BaseLogger<K> & K {
        return new BaseLogger({ ...this.options, globalContext: context }) as BaseLogger<K> & K;
    }
}
