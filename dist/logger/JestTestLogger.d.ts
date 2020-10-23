import { LoggerInterface } from "./LoggerInterface";
import { AbstractFunctionLogger } from "./AbstractFunctionLogger";
export declare class JestTestLogger extends AbstractFunctionLogger implements LoggerInterface {
    trace: any;
    info: any;
    warn: any;
    debug: any;
    error: any;
    mockReset(): void;
}
