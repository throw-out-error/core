"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLogLevelLogger = void 0;
const LoggerInterface_1 = require("./LoggerInterface");
class AbstractLogLevelLogger {
    trace(message, ...optionalParams) {
        this.log(LoggerInterface_1.LogLevel.trace, message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        this.log(LoggerInterface_1.LogLevel.debug, message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        this.log(LoggerInterface_1.LogLevel.info, message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        this.log(LoggerInterface_1.LogLevel.warn, message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.log(LoggerInterface_1.LogLevel.error, message, ...optionalParams);
    }
}
exports.AbstractLogLevelLogger = AbstractLogLevelLogger;
