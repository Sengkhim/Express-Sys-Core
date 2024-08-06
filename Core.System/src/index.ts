import "./core/extensions/dependencyInjection/interfaces/serviceCollection"
import {addApiControllerExplore, addApiControllerExploreV2} from "./decorator/controllers/apisController";
import {UserController} from "./core/abstract/controller/userController";
import express, {Express, Router} from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import {WebApplication, WebApplicationBuilder} from "./core/application/webApplication";
import ServiceDescriptor from "./core/extensions/dependencyInjection/serviceDescriptor";
import {LoggerImpl} from "./core/abstract/controller/service/logger";

export const baseRoute: Router = express.Router();

const builder: WebApplicationBuilder = WebApplication.createBuilder();

builder.services.add(ServiceDescriptor.transient("ILogger", LoggerImpl));

const app: Express = builder.build();

addApiControllerExploreV2(builder);
addApiControllerExplore(UserController);

app.use(cors());
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.use(bodyParser.json());
app.use(compression());

app.listen(3000, () =>
    console.log(`server is running => http://localhost:${3000}`));