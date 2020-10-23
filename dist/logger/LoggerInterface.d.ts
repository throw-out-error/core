export declare enum LogLevel {
    trace = 0,
    debug = 1,
    info = 2,
    warn = 3,
    error = 4
}
export interface LoggerInterface {
    trace(message?: unknown, ...optionalParams: unknown[]): void;
    debug(message?: unknown, ...optionalParams: unknown[]): void;
    info(message?: unknown, ...optionalParams: unknown[]): void;
    warn(message?: unknown, ...optionalParams: unknown[]): void;
    error(message?: unknown, ...optionalParams: unknown[]): void;
    log(level: LogLevel, message: unknown, ...optionalParams: unknown[]): void;
}
