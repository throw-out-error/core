import { readFile as rF, writeFile as wF, access } from "fs/promises";
import fs from "fs";
import { LoggerInterface } from "../logger";

export async function readFile<T>(opts: {
    path: string;
    defaultContent?: T;
    parse?: boolean;
}): Promise<T> {
    let data: string;
    try {
        data = await rF(opts.path, { encoding: "utf8" });
        return opts.parse ? JSON.parse(data) : data;
    } catch (err) {
        if (
            err.code &&
            err.code === "ENOENT" &&
            opts.defaultContent !== null &&
            opts.defaultContent !== undefined
        )
            return opts.defaultContent;
        else throw err;
    }
}

export async function writeFile(path: string, data: unknown): Promise<void> {
    if (data instanceof Buffer) data = data.toString("utf8");
    else if (data instanceof Uint8Array) data = Buffer.from(data).toString();
    return await wF(
        path,
        typeof data === "string" ? data : JSON.stringify(data)
    );
}

export async function exists(
    path: string,
    logger?: LoggerInterface
): Promise<boolean> {
    // the result can be either false (from the caught error) or it can be an fs.stats object

    try {
        // fs.access is low level API, it throws error when it doesn't match any of the flags
        // is dir exists? writable? readable?
        await access(
            path,
            fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK
        );
        return true;
    } catch (error) {
        if (logger) logger.error(`${path} is not exists / writable / readable`);
        return false;
    }
}
