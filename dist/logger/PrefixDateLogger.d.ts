import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import { Moment } from "moment";
export declare class PrefixDateLogger extends AbstractLogLevelLogger implements LoggerInterface {
    private readonly logger;
    private readonly format;
    private readonly separator;
    private readonly now;
    constructor(logger: LoggerInterface, format?: string, separator?: string, now?: () => Moment);
    log(level: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
    private formatDate;
}
