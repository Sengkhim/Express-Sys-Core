// import {IServiceCollection} from "../dependencyInjection/interfaces/serviceCollection";
//
//
// interface IServiceCollectionMgrConstructor {
//
//     new (value?: any): IServiceCollection;
//
//     (value?: any): IServiceCollection;
//
//     readonly prototype: IServiceCollection;
// }
//
//
// declare var io: IServiceCollectionMgrConstructor;


import {IServiceCollection} from "../dependencyInjection/interfaces/serviceCollection";

export default interface IKey {

    readonly prototype: IServiceCollection
}