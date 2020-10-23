"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostfixLogger = void 0;
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
class PostfixLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(logger, postfix) {
        super();
        this.logger = logger;
        this.postfix = postfix;
    }
    static with(logger, postfix) {
        return new this(logger, postfix);
    }
    log(level, message, ...optionalParams) {
        this.logger.log(level, message + this.postfix, ...optionalParams);
    }
}
exports.PostfixLogger = PostfixLogger;
