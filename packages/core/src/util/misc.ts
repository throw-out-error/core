import { asTree } from "treeify";
import { NDArray } from "./types";

export const asyncTimeout = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export const treeify = (
    data: unknown,
    showValues = true,
    hideFunctions = true
): string => {
    return asTree(JSON.parse(JSON.stringify(data)), showValues, hideFunctions);
};

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_: string, value: unknown) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return;

            seen.add(value);
        }
        return value;
    };
};

/**
 * JSON.stringify() without circular references
 */
export const stringify = (data: unknown) =>
    JSON.stringify(data, getCircularReplacer());

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
                (res: unknown, key: string) =>
                    res !== null && res !== undefined
                        ? (res as Record<string, unknown>)[key]
                        : res,
                obj
            );
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};

/**
 * @description Capitalize the first letter of each word
 */
export const capWords = (str: string): string =>
    str.replace(/\b[a-z]/g, (char) => char.toUpperCase());

export const cap = ([first, ...rest], lowerRest = false): string =>
    first.toUpperCase() +
    (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

/**
 * @description Chunks an array into smaller arrays of a specified size.
 * @param a The array or string to split up into chunks.
 */
export const chunk = <T = number>(a: T[], b: number): NDArray<T> =>
    Array.from({ length: Math.ceil(a.length / b) }, (_, r) =>
        a.slice(r * b, r * b + b)
    );
