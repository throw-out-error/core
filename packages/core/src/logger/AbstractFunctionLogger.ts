import { LoggerInterface, LogLevel } from "./LoggerInterface";

export abstract class AbstractFunctionLogger implements LoggerInterface {
    public abstract trace(
        message?: unknown,
        ...optionalParams: unknown[]
    ): void;
    public abstract debug(
        message?: unknown,
        ...optionalParams: unknown[]
    ): void;
    public abstract info(message?: unknown, ...optionalParams: unknown[]): void;
    public abstract warn(message?: unknown, ...optionalParams: unknown[]): void;
    public abstract error(
        message?: unknown,
        ...optionalParams: unknown[]
    ): void;

    public log(
        level: LogLevel,
        message?: unknown,
        ...optionalParams: unknown[]
    ): void {
        switch (level) {
            case LogLevel.trace:
                this.trace(message, ...optionalParams);
                break;
            case LogLevel.debug:
                this.debug(message, ...optionalParams);
                break;
            case LogLevel.info:
                this.info(message, ...optionalParams);
                break;
            case LogLevel.warn:
                this.warn(message, ...optionalParams);
                break;
            case LogLevel.error:
                this.error(message, ...optionalParams);
                break;
            default:
                throw new Error(`Log level "${level}" not supported`);
        }
    }
}
