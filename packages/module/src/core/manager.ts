import { AbstractModule } from "./abstract";
import "reflect-metadata";

export interface Constructor<T> {
    new (...args: unknown[]): T;
}

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
        public readonly modules: Map<string, AbstractModule> = new Map(),
        protected configuration: IModuleConfiguration = defaultConfig
    ) {
        this.modules = modules;
    }

    protected resolveTarget<T>(target: Constructor<T>): T {
        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const injections = tokens.map((token: never) => this.resolve(token));
        return new target(...injections);
    }

    /*
     * @param module The module to add
     */
    public resolve<T extends AbstractModule>(target: Constructor<T>) {
        if (this.modules && this.modules.has(target.name))
            return this.modules.get(target.name);

        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const injections = tokens.map((token: never) =>
            this.resolveTarget<T>(token)
        );

        this.modules.set(target.name, new target(...injections));
        return this.modules.get(target.name);
    }

    public async registerModules() {
        for await (const module of this.modules.values()) {
            // TODO: Improve OR Gate
            if (this.configuration.isTest()) {
                if (module.registerOnTest) await module.register();
            } else await module.register();
            module.setState({ enabled: true });
        }
        return this;
    }
}
