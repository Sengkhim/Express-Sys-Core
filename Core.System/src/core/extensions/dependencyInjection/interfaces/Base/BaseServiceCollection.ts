
declare interface IBaseServiceCollection {}


interface ServiceCollectionConstructor {

    new (value?: any): IBaseServiceCollection;

    (value?: any): IBaseServiceCollection;

    readonly prototype: IBaseServiceCollection;
}

declare var ServiceExtension: ServiceCollectionConstructor;