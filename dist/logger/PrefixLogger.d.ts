import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
export declare class PrefixLogger extends AbstractLogLevelLogger implements LoggerInterface {
    private readonly logger;
    private readonly prefix;
    static with(logger: LoggerInterface, prefix: string): LoggerInterface;
    constructor(logger: LoggerInterface, prefix: string);
    log(level: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
}
