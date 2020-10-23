"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullLogger = void 0;
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
class NullLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    log() {
        // Log nothing.
    }
}
exports.NullLogger = NullLogger;
