import { SymbolToken, ProviderToken } from "./provider";

export function Inject(injectable: ProviderToken<unknown>) {
    return (
        provider: SymbolToken<unknown>,
        _prop: string,
        index: number
    ): void => {
        if (!provider.deps) provider.deps = [];

        if (provider.deps[index] === undefined)
            provider.deps[index] = injectable;
    };
}
