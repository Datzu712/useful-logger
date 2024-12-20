import { LogLevel, LoglevelOption } from './logLevels';

export interface LoggerOptions {
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
