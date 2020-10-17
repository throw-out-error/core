import { ServiceTag, SF } from "../ServiceFactory";
import { ServiceFactoryReference } from "../Value/ServiceFactoryReference";
import { Override } from "../Value/Override";
import { ImmutableServiceReferenceList } from "../Value/ImmutableServiceReferenceList";

export interface ServiceFunctionReferenceContainerInterface<Services = never> {
    getService: (tag: ServiceTag) => SF<Services>;

    references(): ImmutableServiceReferenceList;

    add(
        reference: ServiceFactoryReference,
        bound?: Record<ServiceTag, SF>
    ): SF<never>;

    override<T>(override: Override<T>): this;

    build(): Promise<Services>;
}
