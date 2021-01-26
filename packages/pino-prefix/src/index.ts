import { Logger } from "pino";

export default (prefix: string, pinoInstance: Logger): Logger => {
    const { levels } = pinoInstance;
    const { values } = levels;
    Object.keys(values).forEach((level) => {
        const LOG = pinoInstance[level].bind(pinoInstance);
        pinoInstance[level] = (msg: unknown, ...args: unknown[]) => {
            return LOG(typeof msg === "string" ? prefix + msg : msg, ...args);
        };
    });
    return pinoInstance;
};
