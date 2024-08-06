import {IServiceCollection} from "./interfaces/serviceCollection";
import ServiceDescriptor from "./serviceDescriptor";

export class ServiceCollection implements IServiceCollection {

    public items: Set<ServiceDescriptor> = new Set<ServiceDescriptor>();

    readonly [Symbol.toStringTag]!: string;

    readonly size: number = this.items.size;
    

    toArray (): ServiceDescriptor[] {
        return Array.from(this.items.values());
    }

    [Symbol.iterator](): IterableIterator<ServiceDescriptor> {
        return this.items[Symbol.iterator]();
    }

    add (value: ServiceDescriptor): this {
        if (!this.has(value)) {
            this.items.add(value);
        }
        return this;
    }

    clear (): void {
        this.items.clear();
    }

    delete (value: ServiceDescriptor): boolean {
        if(this.has(value)) {
            this.items.delete(value);
            return true
        }
        return false;
    }

    entries (): IterableIterator<[ServiceDescriptor, ServiceDescriptor]> {
        return this.items.entries();
    }

    forEach (callback: (value: ServiceDescriptor, value2: ServiceDescriptor, set: Set<ServiceDescriptor>) => void, thisArg?: any): void {
    }

    has (value: ServiceDescriptor): boolean {
        return this.items.has(value);
    }

    keys (): IterableIterator<ServiceDescriptor> {
        return this.items[Symbol.iterator]();
    }

    values (): IterableIterator<ServiceDescriptor> {
        return this.items[Symbol.iterator]();
    }
}