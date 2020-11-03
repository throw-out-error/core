export type ConfigType<T extends (...args: unknown[]) => unknown> = T extends (
    ...args: unknown[]
) => infer ReturnVal
    ? ReturnVal extends Promise<infer AsyncReturnVal>
        ? AsyncReturnVal
        : ReturnVal
    : unknown;
