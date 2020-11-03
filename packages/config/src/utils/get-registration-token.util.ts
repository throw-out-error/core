import { PARTIAL_CONFIGURATION_KEY } from "../config.constants";

export function getRegistrationToken(config: Record<string, string>): string {
    return config[PARTIAL_CONFIGURATION_KEY];
}
