/// <reference types="jest" />
import { LoggerInterface } from "./LoggerInterface";
import { AbstractFunctionLogger } from "./AbstractFunctionLogger";
export declare class JestTestLogger extends AbstractFunctionLogger implements LoggerInterface {
    trace: jest.Mock<any, any>;
    info: jest.Mock<any, any>;
    warn: jest.Mock<any, any>;
    debug: jest.Mock<any, any>;
    error: jest.Mock<any, any>;
    mockReset(): void;
}
