import { FeatureFactoryContext } from "./Context/FeatureFactoryContext";
import { ServicesAsFactories } from "./ServiceFactory";

export type FeatureFactory<OwnServices = unknown, Dependencies = unknown> = (
    services: FeatureFactoryContext<OwnServices & Dependencies> &
        ServicesAsFactories<Dependencies>
) => ServicesAsFactories<OwnServices>;

export type FeatureContext<
    OwnServices = unknown,
    Dependencies = unknown
> = FeatureFactoryContext<OwnServices & Dependencies> &
    ServicesAsFactories<Dependencies>;

export type FF<OwnServices = unknown, Dependencies = unknown> = FeatureFactory<
    OwnServices,
    Dependencies
>;
