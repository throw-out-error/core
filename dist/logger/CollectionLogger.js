"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionLogger = void 0;
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
class CollectionLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(loggers) {
        super();
        this.loggers = loggers;
    }
    log(type, message, ...optionalParams) {
        for (const logger of this.loggers) {
            logger.log(type, message, ...optionalParams);
        }
    }
}
exports.CollectionLogger = CollectionLogger;
