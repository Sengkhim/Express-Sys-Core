import {Type} from "ts-morph";
import {IServiceCollection} from "../../extensions/dependencyInjection/interfaces/serviceCollection";

export default interface IServiceProvider {
    /**
     * Gets the service object of the specified type
     * A service object of a type <parameter name="serviceType"
     * -or-
     * if there is no service object of a type <parameter name="serviceType"
     * @param serviceType An object that specifies the type of service object to get
     */
    getService (serviceType: Type): Type | null;
}

export class ServiceProvider implements IServiceProvider {

    constructor (private readonly serviceCollection: IServiceCollection) {
    }

    public getService (serviceType: Type): Type | null {
        try {
            for (const descriptor of this.serviceCollection.values()) {
                if (descriptor.serviceType === serviceType) {
                    return descriptor.getImplementType();
                }
            }
            return null;
        } catch (error) {
            throw new Error("Not found implementation!");
        }
    }
}