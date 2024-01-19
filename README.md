# useful-logger

La clase `Logger` es una implementación de un logger que puede ser utilizado en toda tu aplicación.

# Basic usage

## Options

- `folderPath` (optional): The directory to save logs.
- `outputTemplate` (optional): The expected output template. It will be used to format the output (log message). Default is '{timestamp} {context} {level} {message}'.
- `testing` (optional): Testing mode. Enable it and the logger will write the logs in a different folder. Default is `false`.
- `logLevels` (optional): Enabled log levels. If some log level is not enabled, the logger will not log it. Default is `['log']`.
- `allowWriteFiles` (optional): Allows the logger to write (or create) log files in the folder given in 'folderPath'.
- `allowConsole` (optional): Allows the output in the console. Can be a boolean or an array of `LogLevels`.
- `context` (optional): Default context.
- `indents` (optional): This is an object where keys are MessageLogExpressionsKey and values are the number of spaces to indent the output. This helps in aligning the log messages for better readability.

```typescript
import { Logger } from 'useful-logger';

const logger = new Logger('MyClass', { /* options */  });
logger.log('I am a log message');
```

## Singleton usage

We use a singleton pattern to create a single instance of the logger. This is useful to avoid creating multiple instances of the logger so you can keep the configuration of the logger in a single place.

```typescript
import { Logger } from 'useful-logger';

Logger.log('I am a log message');
```

## Bind context

Having instantiated the logger, you can bind the context creating a new instance (this will not affect the original instance).

```typescript
class userService {
    private logger = new Logger('userService');

    public login() {
        this.logger.log('I am a log message');
        // [userService] I am a log message
    }
}
```

## Sample output

```typescript
[AppName - 28940] 19/01/2024, 05:27:22 - DEBUG   SomeContext          Hello World!
[AppName - 28940] 19/01/2024, 05:27:22 - DEBUG   SomeContext2222222   Hello World!
[AppName - 29003] 19/01/2024, 05:27:23 - DEBUG   SomeContext          Hello World!
[AppName - 29003] 19/01/2024, 05:27:23 - DEBUG   SomeContext2222222   Hello World!
```

config

```typescript
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
```
