import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
export declare class PostfixLogger extends AbstractLogLevelLogger implements LoggerInterface {
    private readonly logger;
    private readonly postfix;
    static with(logger: LoggerInterface, postfix: string): LoggerInterface;
    constructor(logger: LoggerInterface, postfix: string);
    log(level: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
}
