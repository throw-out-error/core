import { readFile as rF, writeFile as wF } from "fs";

export const asyncTimeout = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export async function readFile(
    path: string,
    defaultContent?: Buffer
): Promise<Buffer> {
    return new Promise((res, rej) =>
        rF(path, (err, data) =>
            !err
                ? res(data)
                : err.code === "ENOENT" && defaultContent !== undefined
                ? res(defaultContent)
                : rej(err)
        )
    );
}

export function writeFile(
    path: string,
    data: string | Buffer | Uint8Array
): Promise<void> {
    return new Promise((res, rej) =>
        wF(path, data, (err) => (err !== null ? rej(err) : res()))
    );
}
