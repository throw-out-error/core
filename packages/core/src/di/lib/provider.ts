export type ClassProviderToken<T> = {
    deps?: ProviderToken<unknown>[];
    provideInRoot?: boolean;

    new (...args: unknown[]): T;
};

export type AbstractClassProviderToken<T> = Function & {
    prototype: T;
    deps?: ProviderToken<unknown>[];
    provideInRoot?: boolean;
};

export type SymbolToken<T> =
    | ClassProviderToken<T>
    | AbstractClassProviderToken<T>;

export type ProviderToken<T> = SymbolToken<T> | string;

export interface ClassProvider<T> {
    provide: ProviderToken<T>;
    useClass: ClassProviderToken<T>;
    provideInRoot?: boolean;
}

export interface FactoryProvider<T> {
    provide: ProviderToken<T>;
    useFactory: (...args: unknown[]) => T;
    deps?: ProviderToken<unknown>[];
    provideInRoot?: boolean;
}

export type OverrideProvider<T> = ClassProvider<T> | FactoryProvider<T>;
