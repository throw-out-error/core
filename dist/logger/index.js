"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const NullLogger_1 = require("./NullLogger");
/**
 * Helper method that automatcially returns a  null logger if the logger isn't present in options.
 */
function getLogger(options) {
    return (options && options.logger) || new NullLogger_1.NullLogger();
}
exports.getLogger = getLogger;
__exportStar(require("./AbstractFunctionLogger"), exports);
__exportStar(require("./AbstractLogLevelLogger"), exports);
__exportStar(require("./CollectionLogger"), exports);
__exportStar(require("./ConsoleLogger"), exports);
__exportStar(require("./FromLogLevelLogger"), exports);
__exportStar(require("./LoggerInterface"), exports);
__exportStar(require("./NullLogger"), exports);
__exportStar(require("./PrefixLogger"), exports);
__exportStar(require("./ProcessLogger"), exports);
__exportStar(require("./PostfixLogger"), exports);
__exportStar(require("./TsLogLogger"), exports);
