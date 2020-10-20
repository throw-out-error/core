"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractFunctionLogger = void 0;
const LoggerInterface_1 = require("./LoggerInterface");
class AbstractFunctionLogger {
    log(level, message, ...optionalParams) {
        switch (level) {
            case LoggerInterface_1.LogLevel.trace:
                this.trace(message, ...optionalParams);
                break;
            case LoggerInterface_1.LogLevel.debug:
                this.debug(message, ...optionalParams);
                break;
            case LoggerInterface_1.LogLevel.info:
                this.info(message, ...optionalParams);
                break;
            case LoggerInterface_1.LogLevel.warn:
                this.warn(message, ...optionalParams);
                break;
            case LoggerInterface_1.LogLevel.error:
                this.error(message, ...optionalParams);
                break;
            default:
                throw new Error(`Log level "${level}" not supported`);
        }
    }
}
exports.AbstractFunctionLogger = AbstractFunctionLogger;
