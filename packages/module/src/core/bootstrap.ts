import { AbstractModule } from "./abstract";
import { defaultConfig, IModuleConfiguration, ModuleManager } from "./manager";
import fg from "fast-glob";
import { EventEmitter } from "events";

export abstract class Application<
    C extends IModuleConfiguration = IModuleConfiguration
> extends EventEmitter {
    abstract baseDir: string;
    config: C = defaultConfig as C;

    loadModules: AbstractModule[] = [];

    protected moduleManager: ModuleManager;

    async init() {
        this.moduleManager = new ModuleManager(this.loadModules, this.config);
    }

    getModuleManager(): ModuleManager {
        return this.moduleManager;
    }
}

/**
 * Bootstraps an application and its modules.
 * @param app An Application instance
 */
export const bootstrap = async <C extends IModuleConfiguration>(
    app: Application<C>
) => {
    app.emit("init");
    await app.init();
    app.emit("postInit");
    app.emit("initModules");
    for await (const f of await fg(`${app.baseDir}/**/*.js`)) {
        const imported = await import(f);
        try {
            const m: AbstractModule = new imported.default(
                app.getModuleManager()
            );
            if (app.config.isDebug())
                console.debug(`Loading module: ${m.name}`);
            app.getModuleManager().add(m);
        } catch (err) {
            // Do nothing if it can't be constructed
        }
    }
    await app.getModuleManager().registerModules();
    app.emit("postInitModules");
    return app;
};
