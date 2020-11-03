export type NoInferType<T> = [T][T extends unknown ? 0 : never];
