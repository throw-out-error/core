import { LoggerInterface, LogLevel } from "./LoggerInterface";
export declare abstract class AbstractFunctionLogger implements LoggerInterface {
    abstract trace(message?: unknown, ...optionalParams: unknown[]): void;
    abstract debug(message?: unknown, ...optionalParams: unknown[]): void;
    abstract info(message?: unknown, ...optionalParams: unknown[]): void;
    abstract warn(message?: unknown, ...optionalParams: unknown[]): void;
    abstract error(message?: unknown, ...optionalParams: unknown[]): void;
    log(level: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
}
