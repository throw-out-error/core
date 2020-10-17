export const once = <T extends () => R, R>(fn: T): (() => R) => {
    let called = false;
    let hasResult = false;
    let result: R;
    return function (this: unknown, ...args: unknown[]) {
        if (called) {
            if (hasResult) {
                return result;
            }
            throw new Error("Recursion error");
        }
        called = true;
        result = fn.apply(this, args);
        hasResult = true;
        return result;
    };
};
