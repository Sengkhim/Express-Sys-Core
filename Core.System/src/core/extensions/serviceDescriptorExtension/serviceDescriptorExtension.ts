// class ServiceCollections {
//
//     public addApiControllerExplore(): void {}
// }
//
//
// declare module "../dependencyInjection/interfaces/serviceCollection" {
//     export interface IServiceCollection {
//
//         addApiControllerExplore(): void;
//     }
// }
//
// ServiceCollections.prototype.addApiControllerExplore = function () {
//     console.log("Add all controllers..");
// }
//
// import "../dependencyInjection/interfaces/serviceCollection";
//
// interface IServiceCollection {
//
//     addApiControllerExplore(): void;
//
//     readonly prototype: IServiceCollection;
// }
//
//
// declare var Service: IServiceCollection;
//
// Service.prototype.addApiControllerExplore = function () {
//     console.log("Add all controllers..");
// }