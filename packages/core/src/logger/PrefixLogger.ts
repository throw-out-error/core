import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import { ConsoleLogger } from "./ConsoleLogger";

export class PrefixLogger
    extends AbstractLogLevelLogger
    implements LoggerInterface {
    public static with(opts: {
        logger?: LoggerInterface;
        prefix: string;
    }): LoggerInterface {
        return new this(opts.prefix, opts.logger);
    }

    private readonly logger: LoggerInterface;

    constructor(private readonly prefix: string, logger?: LoggerInterface) {
        super();
        this.logger = logger ?? new ConsoleLogger();
    }

    public log(
        level: LogLevel,
        message?: unknown,
        ...optionalParams: unknown[]
    ): void {
        this.logger.log(level, `${this.prefix} ${message}`, ...optionalParams);
    }
}
