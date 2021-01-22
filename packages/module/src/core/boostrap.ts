import fs from "fs/promises"
import {ModuleManager} from ""
export abstract class Application {
    abstract baseDir: string;
    abstract loadModules: AbstractModule[] = [];
    readonly moduleManager = new ModuleManager();
}


export const bootstrap = async (app: Application) => {
    fs.readdir()
}