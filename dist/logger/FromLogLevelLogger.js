"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FromLogLevelLogger = void 0;
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
class FromLogLevelLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(logger, logFrom) {
        super();
        this.logger = logger;
        this.logFrom = logFrom;
    }
    log(level, message, ...optionalParams) {
        if (this.logFrom > level) {
            return;
        }
        this.logger.log(level, message, ...optionalParams);
    }
}
exports.FromLogLevelLogger = FromLogLevelLogger;
