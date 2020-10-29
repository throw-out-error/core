export const asyncTimeout = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export const getAt = (
    obj: unknown,
    path: string,
    defaultValue = undefined
): unknown => {
    const travel = (regexp: RegExp) =>
        path
            .split(regexp)
            .filter(Boolean)
            .reduce(
                (res: Record<string, unknown>, key: string) =>
                    res !== null && res !== undefined ? res[key] : res,
                obj
            );
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};

function isObject(o: unknown) {
    return Object.prototype.toString.call(o) === "[object Object]";
}

export function isPlainObject(o: unknown): boolean {
    if (isObject(o) === false) return false;

    // If has modified constructor
    const ctor = o.constructor;
    if (ctor === undefined) return true;

    // If has modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty("isPrototypeOf") === false) return false;

    // Most likely a plain Object
    return true;
}
