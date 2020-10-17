import { ServiceFunctionReferenceConfiguration } from "./BaseServiceFactoryReference";
import { ServiceTag, SF } from "../ServiceFactory";
import { FeatureFactory, FF } from "../FeatureFactory";
import { ServiceFactoryReference } from "./ServiceFactoryReference";
import { ImmutableServiceReferenceList } from "./ImmutableServiceReferenceList";
import { TaggedServiceFactoryReference } from "./TaggedServiceFactoryReference";
import { Override } from "./Override";

/**
 * TODO: remove extends.
 */
export class MergedTaggedServiceFunctionReference extends TaggedServiceFactoryReference {
    constructor(
        private original: TaggedServiceFactoryReference,
        tag: string,
        feature: FeatureFactory<unknown>
    ) {
        super({
            tag,
            feature,
            factory: original.getFactory(),
        });
    }

    public override(override: Override) {
        this.original.override(override);
    }

    public get configuration(): ServiceFunctionReferenceConfiguration {
        return this.original.configuration;
    }

    public getUuid(): string {
        return this.original.getUuid();
    }

    public callServiceFactory(thisReference: Record<ServiceTag, SF>) {
        this.original.callServiceFactory(thisReference);
    }

    public getService(): never {
        return this.original.getService();
    }

    public setContainerConfiguration(
        _configuration: ServiceFunctionReferenceConfiguration
    ) {
        // Ignore, This should actually unknown been called.
    }

    public getFactory(): SF<unknown> {
        return this.original.getFactory();
    }

    public getFeature(): FF {
        return this.feature;
    }

    public getProxy(): SF<unknown> {
        return this.original.getProxy();
    }

    public hasServiceInstance(): boolean {
        return this.original.hasServiceInstance();
    }

    public addDependency(dependency: ServiceFactoryReference) {
        this.original.addDependency(dependency);
    }

    public getDependencies(): ImmutableServiceReferenceList {
        return this.original.getDependencies();
    }

    public label(): string {
        return `${this.feature.name || "unknown"}.${
            this.tag
        } --> {${this.original.label()}}`;
    }
}
