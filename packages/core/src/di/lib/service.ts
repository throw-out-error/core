import { SymbolToken } from "./provider";

export interface ServiceConfig {
    provideInRoot: boolean;
}

export function RootService(
    serviceConfig: ServiceConfig = { provideInRoot: true }
) {
    return (provider: SymbolToken<unknown>): void => {
        provider.provideInRoot = serviceConfig.provideInRoot;
    };
}
