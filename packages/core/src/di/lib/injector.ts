import {
    ProviderToken,
    OverrideProvider,
    ClassProviderToken,
    FactoryProvider,
    SymbolToken,
} from "./provider";

export interface InjectorOptions {
    providers?: OverrideProvider<unknown>[];
    bootstrap?: ProviderToken<unknown>[];
}

/**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of unknown class that is property annotated with dependencies.
 *
 * @param opts configuration options for the current instance of Injector
 * @param parent a parent instance of Injector
 */
export class Injector {
    private providerWeakMap = new WeakMap<SymbolToken<unknown>, unknown>();
    private providerMap = new Map<string, unknown>();

    constructor(private opts: InjectorOptions = {}, private parent?: Injector) {
        if (this.opts.bootstrap)
            this.opts.bootstrap.forEach((provider) => this.get(provider));
    }

    set(key: ProviderToken<unknown>, value: ClassProviderToken<unknown>) {
        this.opts.providers.push({
            provide: key,
            useClass: value,
        });
    }

    /**
     * recursively check if a singleton instance is available for a provider
     */
    has(token: ProviderToken<unknown>): boolean {
        if (!this.parent)
            return typeof token === "string"
                ? this.providerMap.has(token)
                : this.providerWeakMap.has(token);
        else return this.parent.has(token);
    }

    async resolve<T = Record<string, unknown>>(
        token: ProviderToken<T>
    ): Promise<T> {
        const provider = this.findProvider(token);

        if (provider)
            // if an override is available for this Injector use that
            return (await this.createFromOverride(provider)) as T;

        if (typeof provider === "string")
            throw new Error(`No provider found for ${provider}`);

        const symbolToken = token as SymbolToken<T>;

        if (
            this.parent &&
            (this.parent.has(symbolToken) ?? symbolToken.provideInRoot)
        )
            // if a parent is available and contains an instance of the provider already use that
            return this.parent.get(token);

        // if nothing else found assume provider is a class provider
        return this.create(<ClassProviderToken<T>>token);
    }

    /**
     * fetches a singleton instance of a provider
     */
    async get<T = Record<string, unknown>>(
        token: ProviderToken<T>
    ): Promise<T> {
        if (typeof token === "string" && this.providerMap.has(token))
            // if provider has already been created in this scope return it
            return this.providerMap.get(token) as T;
        else if (this.providerWeakMap.has(token as SymbolToken<T>))
            return this.providerWeakMap.get(token as SymbolToken<T>) as T;

        const instance: T = await this.resolve(token);

        if (typeof token === "string") this.providerMap.set(token, instance);
        else this.providerWeakMap.set(token, instance);

        return instance;
    }

    async create<T>(P: ClassProviderToken<T>): Promise<T> {
        return P.deps
            ? new P(
                  ...(await Promise.all(
                      P.deps.map(async (dep) => await this.get(dep))
                  ))
              )
            : new P();
    }

    private async createFromOverride<T = Record<string, unknown>>(
        provider: OverrideProvider<T>
    ): Promise<T> {
        if ("useClass" in provider) return this.create(provider.useClass);
        else if ("useFactory" in provider)
            return await this.createFromFactory(provider as FactoryProvider<T>);

        return null;
    }

    private async createFromFactory<T = Record<string, unknown>>(
        token: FactoryProvider<T>
    ) {
        const deps = token.deps ? token.deps.map((dep) => this.get(dep)) : [];

        return await token.useFactory(token, ...deps);
    }

    private findProvider(
        token: ProviderToken<unknown>
    ): OverrideProvider<unknown> | null {
        if (!this.opts.providers) return null;

        return (
            this.opts.providers.find(
                (provider) => provider.provide === token
            ) ?? null
        );
    }
}
