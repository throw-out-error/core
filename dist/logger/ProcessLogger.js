"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogger = void 0;
const LoggerInterface_1 = require("./LoggerInterface");
const AbstractLogLevelLogger_1 = require("./AbstractLogLevelLogger");
const os = __importStar(require("os"));
const util = __importStar(require("util"));
/**
 * With format option like console. Handy if you want to control eol.
 *
 * https://nodejs.org/api/util.html#util_util_format_format_args
 */
class ProcessLogger extends AbstractLogLevelLogger_1.AbstractLogLevelLogger {
    constructor(process, eol = os.EOL) {
        super();
        this.process = process;
        this.eol = eol;
    }
    log(type, message, ...optionalParams) {
        if (type === LoggerInterface_1.LogLevel.error) {
            this.process.stderr.write(util.format(message, ...optionalParams) + this.eol);
            return;
        }
        this.process.stdout.write(util.format(message, ...optionalParams) + this.eol);
    }
}
exports.ProcessLogger = ProcessLogger;