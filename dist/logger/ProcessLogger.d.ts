/// <reference types="node" />
import { LoggerInterface, LogLevel } from "./LoggerInterface";
import { AbstractLogLevelLogger } from "./AbstractLogLevelLogger";
import Process = NodeJS.Process;
/**
 * With format option like console. Handy if you want to control eol.
 *
 * https://nodejs.org/api/util.html#util_util_format_format_args
 */
export declare class ProcessLogger extends AbstractLogLevelLogger implements LoggerInterface {
    private readonly process;
    private eol;
    constructor(process: Process, eol?: string);
    log(type: LogLevel, message?: unknown, ...optionalParams: unknown[]): void;
}
