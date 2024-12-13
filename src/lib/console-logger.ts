import { log } from 'console';
import { LogLevel, LogMessage, LoglevelOption } from '../interfaces';

export interface ConsoleLoggerOptions {
    /**
     * Global context for the logger.
     *
     * Note: When you re instance the logger, the context will be replaced
     * @default application
     */
    globalContext?: string;

    levels: { [k: string | LogLevel]: LoglevelOption };

    override?: {
        writeInConsole?: boolean;
        disableOutputFile?: boolean;
    };

    /**
     * Changes the location of all output files
     */
    outputFolderFile?: string;
}

class BaseConsoleLogger {
    constructor(private options: ConsoleLoggerOptions) {}

    public defaultLogWriter(...messages: LogMessage) {
        console.log(messages);
    }
}

const ConsoleLogger = class DynamicConsoleLogger {
    constructor(options: ConsoleLoggerOptions) {
        const levels = Object.keys(options.levels) as LogLevel[];
        return new Proxy(new BaseConsoleLogger(options), {
            get(targetObject, propertyKey, proxyReceiver) {
                if (typeof propertyKey === 'string' && levels.includes(propertyKey as LogLevel)) {
                    return (...logMessages: LogMessage) => targetObject.defaultLogWriter(...logMessages);
                }
                return Reflect.get(targetObject, propertyKey, proxyReceiver);
            },
        });
    }
} as new <T extends ConsoleLoggerOptions>(
    options: T,
) => BaseConsoleLogger & {
    [K in keyof T['levels']]: (...logMessages: LogMessage) => void;
};

// Ejemplo de uso:
const logger = new ConsoleLogger({
    levels: {
        error: {
            type: LogLevel.Error,
            writeInConsole: true,
            outputFile: 'error.log',
        },
        warn: {
            type: LogLevel.Warn,
            writeInConsole: true,
            outputFile: 'warn.log',
        },
        log: {
            type: LogLevel.Log,
            writeInConsole: true,
            outputFile: 'log.log',
        },
        xd: {
            type: 'xd',
            writeInConsole: true,
            outputFile: 'xd.log',
        },
    },
});
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.log('This is a log message');

logger.xd('This is a xd message'); // typescript is happy :D
// logger.debug('This is a debug message'); // typescript will throw an error here
