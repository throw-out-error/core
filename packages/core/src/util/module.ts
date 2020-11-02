export interface Module {
    onEnable<T>(): Promise<T>;
    onDisable<T>(): Promise<T>;
}
