"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestTestLogger = void 0;
const AbstractFunctionLogger_1 = require("./AbstractFunctionLogger");
class JestTestLogger extends AbstractFunctionLogger_1.AbstractFunctionLogger {
    constructor() {
        super(...arguments);
        this.trace = jest.fn();
        this.info = jest.fn();
        this.warn = jest.fn();
        this.debug = jest.fn();
        this.error = jest.fn();
    }
    mockReset() {
        this.trace.mockReset();
        this.info.mockReset();
        this.warn.mockReset();
        this.debug.mockReset();
        this.error.mockReset();
    }
}
exports.JestTestLogger = JestTestLogger;
