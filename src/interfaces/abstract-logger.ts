import { LogMessage } from './logMessage';

export interface AbstractLogger {
    debug: (...messages: LogMessage) => void;
    error: (...messages: LogMessage) => void;
    warn: (...messages: LogMessage) => void;
    log: (...messages: LogMessage) => void;
    verbose?: (...messages: LogMessage) => void;
    http?: (...messages: LogMessage) => void;
}
