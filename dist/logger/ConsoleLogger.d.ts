/// <reference types="node" />
import { LoggerInterface } from "./LoggerInterface";
import { TsLogLogger } from "./TsLogLogger";
export declare class ConsoleLogger extends TsLogLogger implements LoggerInterface {
    readonly console: Console;
    constructor(console: Console);
}
