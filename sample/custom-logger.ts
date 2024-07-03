import { Logger } from '../src';

// note that console doesn't have the method verbose
Logger.overrideLocalInstance(console);
const logger = new Logger();

logger.log('Hello world!');
