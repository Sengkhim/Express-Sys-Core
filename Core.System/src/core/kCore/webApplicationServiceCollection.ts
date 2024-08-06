import {ServiceCollection} from "../extensions/dependencyInjection/ServiceCollection";
import {IServiceCollection} from "../extensions/dependencyInjection/interfaces/serviceCollection";
import ServiceDescriptor from "../extensions/dependencyInjection/serviceDescriptor";

export class WebApplicationServiceCollection implements IServiceCollection {

    private services: IServiceCollection = new ServiceCollection();

    public hostedServices : Set<ServiceDescriptor> = new Set<ServiceDescriptor>();

    readonly [Symbol.toStringTag]!: string;
    readonly size: number = this.services.size;

    toArray (): ServiceDescriptor[] {
        return Array.from(this.services.values());
    }

    [Symbol.iterator] (): IterableIterator<ServiceDescriptor> {
        return this.services[Symbol.iterator]();
    }

    add (value: ServiceDescriptor): this {
        if (!this.has(value)) {
            this.services.add(value);
            this.hostedServices.add(value);
        }
        return this;
    }

    clear (): void {
        this.services.clear();
    }

    delete (value: ServiceDescriptor): boolean {
        return this.services.delete(value);
    }

    entries (): IterableIterator<[ServiceDescriptor, ServiceDescriptor]> {
        return this.services.entries();
    }

    forEach (action: (value: ServiceDescriptor, value2: ServiceDescriptor,
                      set: Set<ServiceDescriptor>) => void, thisArg?: any): void {
        this.services.forEach(action);
    }

    has (value: ServiceDescriptor): boolean {
        return this.services.has(value);
    }

    keys (): IterableIterator<ServiceDescriptor> {
        return this.services.keys();
    }

    values (): IterableIterator<ServiceDescriptor> {
        return this.services.values();
    }
}