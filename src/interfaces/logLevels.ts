export enum LogLevel {
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Http = 'http',
    Verbose = 'verbose',
    Debug = 'debug',
    Log = 'log',
}

export type LoglevelOption = {
    type: LogLevel | string;
    /**
     * @default true
     */
    writeInConsole?: boolean;

    /**
     * False to disable the output to a file
     * @default 'logs.log'
     */
    outputFile?: string | false;

    format?: (message: string) => string;
};

export type LogLevels = 'log' | 'error' | 'warn' | 'debug' | 'verbose';
