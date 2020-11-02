import { Inject, ConsoleLogger, PrefixLogger } from "@toes/core";
import { CONFIG_OPTIONS } from "./constants";
import { ConfigModuleOptions, EnvHash } from "./interfaces";

/**
 * Root abstract class for ConfigManager. Provides core members and constructor
 * to derived classes.
 *
 * Invokes the entry point in the ConfigManager.
 */
export abstract class AbstractConfigManager {
    protected readonly logger = new PrefixLogger(
        new ConsoleLogger(),
        "ConfigManager"
    );

    protected readonly procEnv: EnvHash;

    constructor(@Inject(CONFIG_OPTIONS) public options: ConfigModuleOptions) {
        this.procEnv = Object.assign({}, process.env);
        this.load();
    }

    protected abstract load();
}
