import { Scope } from "@toes/core";
import { SCOPE_OPTIONS_METADATA } from "@toes/core/constants";
import { Type } from "@toes/core/interfaces/type.interface";

export function getClassScope(provider: Type<unknown>): Scope {
    const metadata = Reflect.getMetadata(SCOPE_OPTIONS_METADATA, provider);
    return metadata && metadata.scope;
}
