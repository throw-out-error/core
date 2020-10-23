import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import { createStream, RotatingFileStream } from "rotating-file-stream";
import { format } from "util";
import { EOL } from "os";

export class RFSLogger
    extends AbstractLogLevelLogger
    implements LoggerInterface {
    accessStream: RotatingFileStream;
    errStream: RotatingFileStream;
    eol: string;

    constructor(opts: {
        accessStream?: RotatingFileStream;
        errStream?: RotatingFileStream;
        eol: string;
    }) {
        super();
        this.accessStream =
            opts.accessStream ??
            createStream(`${process.cwd()}/access.log`, {
                interval: "1d", // rotate daily
                compress: "gzip", // compress rotated files
            });
        this.errStream =
            opts.errStream ??
            createStream(`${process.cwd()}/error.log`, {
                interval: "1d", // rotate daily
                compress: "gzip", // compress rotated files
            });
        this.eol = opts.eol ?? EOL;
    }

    public log(
        level: LogLevel,
        message?: unknown,
        ...optionalParams: unknown[]
    ): void {
        if (level === LogLevel.error)
            this.errStream.write(format(message, ...optionalParams) + this.eol);
        else
            this.accessStream.write(
                format(message, ...optionalParams) + this.eol
            );
    }
}
