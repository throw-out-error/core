import { LoggerInterface, LogLevel } from "./LoggerInterface";
export declare abstract class AbstractLogLevelLogger implements LoggerInterface {
    trace(message?: unknown, ...optionalParams: unknown[]): void;
    debug(message?: unknown, ...optionalParams: unknown[]): void;
    info(message?: unknown, ...optionalParams: unknown[]): void;
    warn(message?: unknown, ...optionalParams: unknown[]): void;
    error(message?: unknown, ...optionalParams: unknown[]): void;
    abstract log(type: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
}
