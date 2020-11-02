import { DynamicModule, Global, Module } from "@toes/core";
import { ValueProvider } from "@toes/core/interfaces";
import { requestProvider } from "../router/request/request-providers";
import { Reflector } from "../services";
import { inquirerProvider } from "./inquirer/inquirer-providers";

@Global()
@Module({
    providers: [Reflector, requestProvider, inquirerProvider],
    exports: [Reflector, requestProvider, inquirerProvider],
})
export class InternalCoreModule {
    static register(providers: ValueProvider[]): DynamicModule {
        return {
            module: InternalCoreModule,
            providers: [...providers],
            exports: [...providers.map((item) => item.provide)],
        };
    }
}
