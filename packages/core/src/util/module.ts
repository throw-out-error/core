export interface IModule {
    onEnable<T>(): Promise<T>;
    onDisable<T>(): Promise<T>;
}
