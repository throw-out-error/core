import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import { format } from "date-fns";
export class PrefixDateLogger
    extends AbstractLogLevelLogger
    implements LoggerInterface {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly format: string = "L LTS",
        private readonly separator: string = ":"
    ) {
        super();
    }

    public log(
        level: LogLevel,
        message?: unknown,
        ...optionalParams: unknown[]
    ): void {
        this.logger.log(
            level,
            this.formatDate() + this.separator + message,
            ...optionalParams
        );
    }

    private formatDate(): string {
        return format(Date.now(), this.format);
    }
}
