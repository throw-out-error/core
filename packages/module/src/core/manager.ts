import { AbstractModule } from "./abstract";

export interface IModuleConfiguration {
    isTest(): boolean;
    isDebug(): boolean;
}

export const defaultConfig: IModuleConfiguration = {
    isTest: () => false,
    isDebug: () => false,
};

export class ModuleManager {
    constructor(
        protected modules: Array<AbstractModule>,
        protected configuration: IModuleConfiguration = defaultConfig
    ) {
        this.modules = modules;
    }

    public getModuleList(): Array<AbstractModule> {
        return [...this.modules];
    }

    public find<T extends AbstractModule>(name: string): T | null {
        return (this.modules.find((m) => m.name === name) || null) as T;
    }
    /**
     * Adds the given module to the modules list
     * @param module The module to add
     */
    public add(module: AbstractModule) {
        if (!!this.find(module.name))
            throw new Error(`Module '${module.name}' is already registered.`);

        this.modules.push(module);
    }

    public addAll(...modules: AbstractModule[]) {
        modules.forEach((m) => this.add(m));
    }

    public async registerModules() {
        for await (const module of this.modules) {
            // TODO: Improve OR Gate
            if (this.configuration.isTest()) {
                if (module.registerOnTest) await module.register();
            } else await module.register();
            module.setState({ enabled: true });
        }
        return this;
    }
}
