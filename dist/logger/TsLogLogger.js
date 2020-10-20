"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsLogLogger = void 0;
const AbstractFunctionLogger_1 = require("./AbstractFunctionLogger");
class TsLogLogger extends AbstractFunctionLogger_1.AbstractFunctionLogger {
    constructor(logger) {
        super();
        this.logger = logger;
        this.trace = this.logger.trace.bind(this.logger);
        this.debug = this.logger.debug.bind(this.logger);
        this.info = this.logger.info.bind(this.logger);
        this.warn = this.logger.warn.bind(this.logger);
        this.error = this.logger.error.bind(this.logger);
    }
}
exports.TsLogLogger = TsLogLogger;
