export abstract class AbstractModule {
    abstract name: string;
    abstract registerOnTest: boolean;
    abstract parentModule?: string;

    /**
     * Register all parts of the module
     * @returns {Promise<unknown>}
     */
    abstract register(): Promise<unknown>;
}
