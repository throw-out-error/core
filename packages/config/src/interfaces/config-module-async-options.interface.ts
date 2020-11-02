/** Dependencies **/
import { DI } from "@toes/core";

/** Interfaces **/
import { ConfigModuleOptions } from "./config-module-options.interface";
import { ConfigOptionsFactory } from "./config-options-factory.interface";

export interface ConfigModuleAsyncOptions
    extends Pick<DI.ModuleMetadata, "imports"> {
    inject?: unknown[];
    useClass?: DI.Type<ConfigOptionsFactory>;
    useExisting?: DI.Type<ConfigOptionsFactory>;
    useFactory?: (
        ...args: unknown[]
    ) => Promise<ConfigModuleOptions> | ConfigModuleOptions;
}
