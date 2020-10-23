"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogger = void 0;
const LoggerInterface_1 = require("./LoggerInterface");
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
const os_1 = require("os");
const util_1 = require("util");
/**
 * With format option like console. Handy if you want to control eol.
 *
 * https://nodejs.org/api/util.html#util_util_format_format_args
 */
class ProcessLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(processImpl, eol = os_1.EOL) {
        super();
        this.processImpl = processImpl;
        this.eol = eol;
        if (!this.processImpl)
            this.processImpl = processImpl;
    }
    log(type, message, ...optionalParams) {
        if (type === LoggerInterface_1.LogLevel.error) {
            this.processImpl.stderr.write(util_1.format(message, ...optionalParams) + this.eol);
            return;
        }
        this.processImpl.stdout.write(util_1.format(message, ...optionalParams) + this.eol);
    }
}
exports.ProcessLogger = ProcessLogger;
