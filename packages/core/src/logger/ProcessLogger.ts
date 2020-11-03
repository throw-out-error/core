import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import { EOL } from "os";
import { format } from "util";

/**
 * With format option like console. Handy if you want to control eol.
 *
 * https://nodejs.org/api/util.html#util_util_format_format_args
 */
export class ProcessLogger
    extends AbstractLogLevelLogger
    implements LoggerInterface {
    constructor(
        private readonly processImpl?: NodeJS.Process,
        private eol = EOL
    ) {
        super();
        if (!this.processImpl) this.processImpl = process;
    }

    public log(
        type: LogLevel,
        message?: unknown,
        ...optionalParams: unknown[]
    ): void {
        if (type === LogLevel.error) {
            this.processImpl.stderr.write(
                format(message, ...optionalParams) + this.eol
            );
            return;
        }
        this.processImpl.stdout.write(
            format(message, ...optionalParams) + this.eol
        );
    }
}
