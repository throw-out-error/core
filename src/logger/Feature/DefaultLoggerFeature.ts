import { LoggerInterface } from "../LoggerInterface";
import { ConsoleLogger } from "../ConsoleLogger";
import { PrefixDateLogger } from "../PrefixDateLogger";
import { FF } from "../../service";

export interface LoggerFeatureServices {
    logger: LoggerInterface;
}

export const DefaultLoggerFeature: FF<LoggerFeatureServices, unknown> = () => ({
    logger: () => new PrefixDateLogger(new ConsoleLogger(console)),
});
