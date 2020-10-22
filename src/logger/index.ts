import { LoggerInterface } from "./LoggerInterface";
import { NullLogger } from "./NullLogger";

/**
 * Helper method that automatcially returns a  null logger if the logger isn't present in options.
 */
export function getLogger(options?: {
    logger?: LoggerInterface;
}): LoggerInterface {
    return (options && options.logger) || new NullLogger();
}

export * from "./AbstractFunctionLogger";
export * from "./AbstractLogLevelLogger";
export * from "./CollectionLogger";
export * from "./ConsoleLogger";
export * from "./FromLogLevelLogger";
export * from "./LoggerInterface";
export * from "./NullLogger";
export * from "./PrefixLogger";
export * from "./ProcessLogger";
export * from "./PostfixLogger";
export * from "./TsLogLogger";
