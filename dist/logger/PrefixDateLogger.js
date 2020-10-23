"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixDateLogger = void 0;
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
const moment_1 = __importDefault(require("moment"));
class PrefixDateLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(logger, format = "L LTS", separator = ":", now = () => moment_1.default()) {
        super();
        this.logger = logger;
        this.format = format;
        this.separator = separator;
        this.now = now;
    }
    log(level, message, ...optionalParams) {
        this.logger.log(level, this.formatDate() + this.separator + message, ...optionalParams);
    }
    formatDate() {
        return this.now().format(this.format);
    }
}
exports.PrefixDateLogger = PrefixDateLogger;
