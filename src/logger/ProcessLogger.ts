import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import * as os from "os";
import * as util from "util";
import Process = NodeJS.Process;

/**
 * With format option like console. Handy if you want to control eol.
 *
 * https://nodejs.org/api/util.html#util_util_format_format_args
 */
export class ProcessLogger
    extends AbstractLogLevelLogger
    implements LoggerInterface {
    constructor(private readonly processImpl?: Process, private eol = os.EOL) {
        super();
        if (!this.processImpl) this.processImpl = processImpl;
    }

    public log(
        type: LogLevel,
        message?: unknown,
        ...optionalParams: unknown[]
    ): void {
        if (type === LogLevel.error) {
            this.processImpl.stderr.write(
                util.format(message, ...optionalParams) + this.eol
            );
            return;
        }
        this.processImpl.stdout.write(
            util.format(message, ...optionalParams) + this.eol
        );
    }
}
