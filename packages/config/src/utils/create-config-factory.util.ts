import { IProvider } from "@tsed/di";
import { v4 as uuid } from "uuid";
import { ConfigFactory } from "../interfaces";
import { getConfigToken } from "./get-config-token.util";
import { ConfigFactoryKeyHost } from "./register-as.util";

export function createConfigProvider(
    factory: ConfigFactory & ConfigFactoryKeyHost
): IProvider {
    const uniqId = uuid();
    return {
        provide: factory.KEY || getConfigToken(uniqId),
        useFactory: factory,
        inject: [],
    };
}
