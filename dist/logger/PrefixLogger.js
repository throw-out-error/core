"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixLogger = void 0;
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
class PrefixLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(logger, prefix) {
        super();
        this.logger = logger;
        this.prefix = prefix;
    }
    static with(logger, prefix) {
        return new this(logger, prefix);
    }
    log(level, message, ...optionalParams) {
        this.logger.log(level, this.prefix + message, ...optionalParams);
    }
}
exports.PrefixLogger = PrefixLogger;
