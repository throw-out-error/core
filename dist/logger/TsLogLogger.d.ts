import { Logger } from "ts-log";
import { LoggerInterface } from "./LoggerInterface";
import { AbstractFunctionLogger } from "./AbstractFunctionLogger";
export declare class TsLogLogger extends AbstractFunctionLogger implements LoggerInterface {
    private logger;
    trace: any;
    debug: any;
    info: any;
    warn: any;
    error: any;
    constructor(logger: Logger);
}
