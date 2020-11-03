import { Inject, Injectable, Opts } from "@tsed/di";
import { CONFIGURATION_TOKEN } from "./config.constants";
import { ConfigService } from "./config.service";
import { parse } from "yaml";
import Joi from "joi";
import { readFileSync } from "fs";

export interface ConfigManagerOpts {
    schema?: Joi.ObjectSchema;
    config?: Record<string, unknown>;
    yamlPath?: string;
}

@Injectable()
export class ConfigManager<K = Record<string, unknown>> extends ConfigService<
    K
> {
    constructor(@Opts protected opts: ConfigManagerOpts = { config: {} }) {
        super(opts.config);
        this.internalConfig = this.load();
    }

    load(): Record<string, unknown> {
        let result: Record<string, unknown> = this.internalConfig;
        if (!result) result = JSON.parse(process.env.CONFIG ?? "{}");
        if (!result && this.opts.yamlPath) {
            try {
                result = parse(
                    readFileSync(this.opts.yamlPath, { encoding: "utf-8" })
                );
            } catch {
                result = {};
            }
        }

        if (this.opts.schema) {
            const res = this.opts.schema.validate(result);
            if (res.error)
                throw new Error(`Invalid config: ${res.error.message}`);
            else result = res.value;
        }
        return result;
    }
}
