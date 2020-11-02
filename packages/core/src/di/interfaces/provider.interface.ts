import { Abstract } from "./abstract.interface";
import { Scope } from "./scope-options.interface";
import { Type } from "./type.interface";

/**
 *
 * @publicApi
 */
export type Provider<T = unknown> =
    | Type<unknown>
    | ClassProvider<T>
    | ValueProvider<T>
    | FactoryProvider<T>
    | ExistingProvider;

/**
 * Interface defining a *Class* type provider.
 *
 * For example:
 * ```typescript
 * const configServiceProvider = {
 * provide: ConfigService,
 * useClass:
 *   process.env.NODE_ENV === 'development'
 *     ? DevelopmentConfigService
 *     : ProductionConfigService,
 * };
 * ```
 *
 * @see [Use class](https://docs.nestjs.com/fundamentals/custom-providers#use-class)
 * @see [Injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes)
 *
 * @publicApi
 */
export interface ClassProvider<T = unknown> {
    /**
     * Injection token
     */
    provide: string | symbol | Type<unknown> | Abstract<unknown> | Function;
    /**
     * Type (class name) of provider (instance to be injected).
     */
    useClass: Type<T>;
    /**
     * Optional enum defining lifetime of the provider that is injected.
     */
    scope?: Scope;
}

/**
 * Interface defining a *Value* type provider.
 *
 * For example:
 * ```typescript
 * const connectionProvider = {
 *   provide: 'CONNECTION',
 *   useValue: connection,
 * };
 * ```
 *
 * @see [Use value](https://docs.nestjs.com/fundamentals/custom-providers#use-value)
 *
 * @publicApi
 */
export interface ValueProvider<T = unknown> {
    /**
     * Injection token
     */
    provide: string | symbol | Type<unknown> | Abstract<unknown> | Function;
    /**
     * Instance of a provider to be injected.
     */
    useValue: T;
}

/**
 * Interface defining a *Factory* type provider.
 *
 * For example:
 * ```typescript
 * const connectionFactory = {
 *   provide: 'CONNECTION',
 *   useFactory: (optionsProvider: OptionsProvider) => {
 *     const options = optionsProvider.get();
 *     return new DatabaseConnection(options);
 *   },
 *   inject: [OptionsProvider],
 * };
 * ```
 *
 * @see [Use factory](https://docs.nestjs.com/fundamentals/custom-providers#use-factory)
 * @see [Injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes)
 *
 * @publicApi
 */
export interface FactoryProvider<T = unknown> {
    /**
     * Injection token
     */
    provide: string | symbol | Type<unknown> | Abstract<unknown> | Function;
    /**
     * Factory function that returns an instance of the provider to be injected.
     */
    useFactory: (...args: unknown[]) => T;
    /**
     * Optional list of providers to be injected into the context of the Factory function.
     */
    inject?: Array<
        Type<unknown> | string | symbol | Abstract<unknown> | Function
    >;
    /**
     * Optional enum defining lifetime of the provider that is returned by the Factory function.
     */
    scope?: Scope;
}

/**
 * Interface defining an *Existing* (aliased) type provider.
 *
 * For example:
 * ```typescript
 * const loggerAliasProvider = {
 *   provide: 'AliasedLoggerService',
 *   useExisting: LoggerService
 * };
 * ```
 *
 * @see [Use existing](https://docs.nestjs.com/fundamentals/custom-providers#use-existing)
 *
 * @publicApi
 */
export interface ExistingProvider {
    /**
     * Injection token
     */
    provide: string | symbol | Type<unknown> | Abstract<unknown> | Function;
    /**
     * Provider to be aliased by the Injection token.
     */
    useExisting: unknown;
}
