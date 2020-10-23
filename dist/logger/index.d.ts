import { LoggerInterface } from "./LoggerInterface";
/**
 * Helper method that automatcially returns a  null logger if the logger isn't present in options.
 */
export declare function getLogger(options?: {
    logger?: LoggerInterface;
}): LoggerInterface;
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
