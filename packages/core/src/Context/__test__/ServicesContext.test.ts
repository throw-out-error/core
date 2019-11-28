import { SF } from '../../ServiceFactory';
import {
  ServicesContext,
  instancesByTags,
  servicesByTags,
  createFeatureFactoryServicesContext,
} from '../ServicesContext';
import { createMutableContainer } from '../../Container';

type FetchA = (tag: 'foo') => SF<number>;
type FetchB = (tag: 'bar') => SF<string>;

it('Can fetch services', () => {
  const fetchService: FetchA & FetchB = jest.fn((tag: 'foo' | 'bar'): any => {
    return () => tag === 'foo' ? 1 : 'test';
  });
  const withServices = servicesByTags<'foo', SF<number>, 'bar', SF<string>>(fetchService);
  const context: ServicesContext<{ foo: SF<number>, bar: SF<string> }> = {
    service: null as any,
    services: withServices as any,
    instances: null as any,
    instance: null as any,
  };
  const [foo, bar] = context.services('foo', 'bar');
  expect(fetchService).not.toBeCalled();
  expect(foo()).toEqual(1);
  expect(bar()).toEqual('test');
});

it('Can fetch service instances', () => {
  const fetchServices = jest.fn((_tags: string[]): any => {
    return [() => 1, () => 2];
  });
  const withServices = instancesByTags(fetchServices as any);
  const context: ServicesContext<{ foo: SF<number>, bar: SF<string> }> = {
    service: null as any,
    services: null as any,
    instances: withServices as any,
    instance: null as any,
  };
  const [foo, bar] = context.instances('foo', 'bar');
  expect(fetchServices).toBeCalledWith('foo', 'bar');
  expect(foo).toEqual(1);
  expect(bar).toEqual(2);
});

it('Can fetch single service instance', () => {
  const container = createMutableContainer();
  container.setService('foo', () => 'bar');
  const context = createFeatureFactoryServicesContext(container);
  expect(context.instance('foo')).toEqual('bar');
});