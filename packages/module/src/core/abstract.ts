import { merge } from "@corex/deepmerge";
import { ModuleManager } from "./manager";

export interface IModuleState {
    enabled: boolean;
}

export abstract class AbstractModule<S extends IModuleState = IModuleState> {
    abstract name: string;
    abstract registerOnTest: boolean;
    abstract parentModule?: string;
    protected enabled = false;
    protected state: S = { enabled: false } as S;

    constructor(public readonly manager: ModuleManager) {}

    public getState(): S {
        return this.state;
    }

    public setState<K extends keyof S>(obj: Pick<S, K>) {
        this.state = merge([this.state, obj]) as S;
        return this.state;
    }

    /**
     * Register all parts of the module
     * @returns {Promise<unknown>}
     */
    abstract register(): Promise<unknown>;
}
