import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
export declare class FromLogLevelLogger extends AbstractLogLevelLogger implements LoggerInterface {
    private readonly logger;
    private logFrom;
    constructor(logger: LoggerInterface, logFrom: LogLevel);
    log(level: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
}
