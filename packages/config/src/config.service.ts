import { Inject, Injectable } from "@tsed/di";
import {
    CONFIGURATION_TOKEN,
    VALIDATED_ENV_PROPNAME,
} from "./config.constants";
import { NoInferType } from "./types";

@Injectable()
export class ConfigService<K = Record<string, unknown>> {
    constructor(protected internalConfig: Record<string, unknown> = {}) {}

    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValue
     */
    get<T = unknown>(propertyPath: keyof K): T | undefined;
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValue
     */
    get<T = unknown>(propertyPath: keyof K, defaultValue: NoInferType<T>): T;
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValue
     */
    get<T = unknown>(propertyPath: keyof K, defaultValue?: T): T | undefined {
        const validatedEnvValue = this.internalConfig[VALIDATED_ENV_PROPNAME][
            propertyPath
        ];

        if (validatedEnvValue !== undefined)
            return (validatedEnvValue as unknown) as T;

        const processValue = process.env[propertyPath as string];
        if (processValue !== undefined) return (processValue as unknown) as T;

        const internalValue = this.internalConfig[propertyPath as string];
        return internalValue !== undefined ? defaultValue : internalValue;
    }
}
