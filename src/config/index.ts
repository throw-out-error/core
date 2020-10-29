import fs from "fs";
import yaml from "yaml";
import { getAt, isPlainObject } from "../util";

const timestamp = new Date()
    .toISOString()
    .slice(-24)
    .replace(/\D/g, "")
    .slice(0, 14);
let multiFile = false;

export type DefaultConfigType = Record<string, unknown>;

export function loadConfigFile<T = Record<string, unknown>>(file: string): T {
    try {
        return yaml.parse(fs.readFileSync(file, "utf8")) as T;
    } catch (e) {
        if (!/ENOENT:\s+no such file or directory/.test(e))
            console.log("Error Loading " + file + ":", e);
        throw e;
    }
}

function loadConfig<T = DefaultConfigType>(): T {
    if (fs.existsSync("config.yml")) return loadConfigFile("config.yml");
    else {
        const templ = {};
        multiFile = true;
        const files = fs.readdirSync("config");
        for (let i = 0; i < files.length; i++) {
            if (files[i].endsWith(".yml")) {
                const keyName = files[i].substring(
                    0,
                    files[i].length - ".yml".length
                );
                templ[keyName] = loadConfigFile("config/" + files[i]);
            }
        }
        return templ as T;
    }
}

function substitute(file: Record<string, unknown>, p: string) {
    let success = false;
    const replaced = p.replace(/\${([\w.-]+)}/g, (match, term) => {
        if (!success) success = Object.values(file).includes(term);

        return (getAt(file, term) ?? match) as string;
    });
    return { success: success, replace: replaced };
}

function transform(
    file: Record<string, unknown>,
    obj: Record<string, unknown>
) {
    let changed = false;
    const resultant = Object.values(obj).map((p) => {
        if (isPlainObject(p)) {
            const transformed = transform(file, p as Record<string, unknown>);
            if (!changed && transformed.changed) changed = true;

            return transformed.result;
        }
        if (typeof p === "string") {
            const subbed = substitute(file, p);
            if (!changed && subbed.success) changed = true;

            return subbed.replace;
        }
        if (Array.isArray(p))
            for (let i = 0; i < p.length; i++)
                if (typeof p[i] === "string")
                    p[i] = substitute(file, p[i]).replace;

        return p;
    });
    return { changed: changed, result: resultant };
}

export function requireSettings(
    config: unknown,
    settings: string[] | string
): void {
    const erredSettings = [];
    settings = typeof settings === "string" ? [settings] : settings;
    Object.values(settings).forEach((setting) => {
        if (!Object.values(config).includes(setting))
            erredSettings.push(setting);
    });

    if (erredSettings.length > 1)
        throw new Error(
            "The following settings are required in config.yml: " +
                erredSettings.join("; ")
        );

    if (erredSettings.length === 1)
        throw new Error(erredSettings[0] + " is required in config.yml");
}

function swapVariables(
    environmentType: string,
    envId: string,
    configFile: Record<string, unknown>
) {
    function readAndSwap(obj: Record<string, unknown>) {
        let altered = false;
        do {
            const temp = transform(obj, obj);
            obj = temp.result;
            altered = temp.changed;
        } while (altered);
        return obj;
    }

    const file = multiFile
        ? Object.values(configFile).map(readAndSwap)
        : configFile;
    const newFile = Object.assign({}, file ?? {}, file[environmentType] ?? {}, {
        envId: envId,
        timestamp: timestamp,
    });

    return readAndSwap(newFile);
}

export function loadConfiguration<T = DefaultConfigType>(opts: {
    env?: string;
    defaultConfig?: Partial<T> | string;
}): T {
    let config: DefaultConfigType = (loadConfig<
        T
    >() as unknown) as DefaultConfigType;
    const envId = opts.env ?? process.env.ENVIRONMENT_ID;
    if (envId)
        config = yaml.parse(
            fs.readFileSync(`config/${envId}.yml`, { encoding: "utf-8" })
        );
    // TODO: nested default values instead of defaultting whole config object
    if (opts.defaultConfig)
        config =
            typeof opts.defaultConfig === "string"
                ? yaml.parse(
                      fs.readFileSync(opts.defaultConfig, { encoding: "utf-8" })
                  )
                : (opts.defaultConfig as DefaultConfigType);

    // config = swapVariables(environmentType, envId, config);
    return config as T;
}
