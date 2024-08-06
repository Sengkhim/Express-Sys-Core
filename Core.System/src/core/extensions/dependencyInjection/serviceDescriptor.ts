import {ServiceLifetime} from "../enums/serviceLifetime";
import {Reflection} from "../../system/reflection/reflection";
import {ClassDeclaration, InterfaceDeclaration, SourceFile, Type} from "ts-morph";
import path from "path";
export default class ServiceDescriptor {

    static readonly sourceFiles: SourceFile[] = Reflection.addSourceFilesAtPaths(path.join(__dirname, "../../../../src/**/*.ts"));
    public readonly lifetime: ServiceLifetime;
    public readonly serviceType: Type;
    public readonly implementType: Type;

    constructor (serviceType: Type, implementationType: Type, lifetime: ServiceLifetime) {

        if (serviceType === null) throw Error("undefined server type!");

        if (implementationType === null) throw Error("undefined implementation type!");

        this.serviceType = serviceType;
        this.implementType = implementationType;
        this.lifetime = lifetime;
    }

    public static transient (keyService: string, implementation: Function): ServiceDescriptor {
        if (keyService === null) {
            throw new Error('Service type and implementation type cannot be null.');
        }
        if (implementation === null) {
            throw new Error('Implementation type cannot be null.');
        }
        return this.Describe(
            ServiceDescriptor.typeOfService(keyService),
            ServiceDescriptor.typeOfImplement(implementation),
            ServiceLifetime.Transient
        );
    }

    static typeOfService (inter: string): Type {
        let type: any;
        this.sourceFiles.forEach((source: SourceFile): void => {
            source.getInterfaces().forEach((interfaceInfo: InterfaceDeclaration): void => {
                if (interfaceInfo.getName().includes(inter))
                    type = interfaceInfo.getType();
            });
        });
        return type;
    }

    static typeOfImplement (implementType: Function): Type {
        let type: any;
        this.sourceFiles.forEach((source: SourceFile): void => {
            source.getClasses().forEach((classInfo: ClassDeclaration): void => {
                if (classInfo.getName()?.includes(implementType.name))
                    type = classInfo.getType();
            });
        });
        return type;
    }

    public getImplementType(): Type {
        return this.implementType;
    }

    private static Describe (
        serviceType: Type, implementation: Type, lifetime: ServiceLifetime): ServiceDescriptor {
        return new ServiceDescriptor(
            serviceType,
            implementation,
            lifetime
        );
    }
}
