import {Express} from "express";
import {IServiceCollection} from "../../../extensions/dependencyInjection/interfaces/serviceCollection";
import IEndpointMetaData from "./endpointMetaData";
import IServiceProvider from "../../../system/interface/serviceProvider";

/**
 * Defines a class that provides the mechanisms to configure an application's request pipeline.
 */
export default interface IApplicationBuilder {

    readonly application: Express;

    readonly services: IServiceCollection;

    readonly endpointSources: IEndpointMetaData;

    readonly serviceProvider: IServiceProvider;
}