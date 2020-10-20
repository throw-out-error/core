"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const TsLogLogger_1 = require("./TsLogLogger");
class ConsoleLogger extends TsLogLogger_1.TsLogLogger {
    /* istanbul ignore next */
    constructor(console) {
        super(console);
        this.console = console;
    }
}
exports.ConsoleLogger = ConsoleLogger;
