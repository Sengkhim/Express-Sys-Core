import express, {Express, NextFunction, Request, Response} from "express";
import {IServiceCollection} from "../extensions/dependencyInjection/interfaces/serviceCollection";
import {WebApplicationServiceCollection} from "../kCore/webApplicationServiceCollection";
import {baseRoute} from "../../index";
import {useMapControllers} from "../../decorator/controllers/apisController";
import IEndpointMetaData from "./builder/interface/endpointMetaData";
import EndpointMetaData from "./builder/implement/endpointMetaData";
import IApplicationBuilder from "./builder/interface/applicationBuilder";
import IServiceProvider, {ServiceProvider} from "../system/interface/serviceProvider";

export class WebApplication {
    static createBuilder (): WebApplicationBuilder {
        return new WebApplicationBuilder();
    }
}

export class WebApplicationBuilder implements IApplicationBuilder {

    public readonly application: Express;
    public readonly services: IServiceCollection;
    public readonly endpointSources: IEndpointMetaData;
    public readonly serviceProvider: IServiceProvider;

    constructor() {
        this.application = express();
        this.services = new WebApplicationServiceCollection();
        this.endpointSources = new EndpointMetaData();
        this.serviceProvider = new ServiceProvider(this.services);
    }

    build(): Express {
        this.application.use((request: Request, response: Response, next: NextFunction) => {
            next();
            useMapControllers(this);
        });
        this.application.use(baseRoute);
        return this.application;
    }
}