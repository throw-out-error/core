import { FeatureContext, FF } from "../FeatureFactory";
import { fromPairs, toPairs } from "ramda";
import { DefaultServices } from "../Feature/defaultServicesKeys";
import { ServicesAsFactories, ServiceTag } from "../ServiceFactory";
import { ContainerFactory } from "../ContainerFactory";

export async function testFeatureFactory<S, D>(
    ff: FF<S, D>,
    dependencies: D,
    contextHook?: (context: FeatureContext<S & DefaultServices & D>) => void
): Promise<S & DefaultServices & D> {
    const services = (fromPairs(
        toPairs(dependencies as Record<ServiceTag, unknown>).map(
            ([tag, service]) => {
                return [tag, () => service];
            }
        )
    ) as unknown) as ServicesAsFactories<D>;
    const dependencyFeature: FF<D, unknown> = () => services;
    return ContainerFactory.create()
        .add(dependencyFeature)
        .add(ff)
        .add((context) => {
            if (contextHook) {
                contextHook(context);
            }
            return {};
        })
        .build();
}
