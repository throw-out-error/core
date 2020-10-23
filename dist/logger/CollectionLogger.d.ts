import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
export declare class CollectionLogger extends AbstractLogLevelLogger implements LoggerInterface {
    private readonly loggers;
    constructor(loggers: LoggerInterface[]);
    log(type: LogLevel, message: unknown, ...optionalParams: unknown[]): void;
}
