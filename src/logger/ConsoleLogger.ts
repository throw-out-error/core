import { LoggerInterface } from "./LoggerInterface";
import { TsLogLogger } from "./TsLogLogger";

export class ConsoleLogger extends TsLogLogger implements LoggerInterface {
    /* istanbul ignore next */
    constructor(readonly consoleImpl?: Console) {
        super(consoleImpl ?? console);
    }
}
