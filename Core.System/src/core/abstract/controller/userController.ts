import {BaseController} from "./baseController";
import {HttpGet, Route} from "../../../decorator/httpMethod/httpGet";
import {ILogger} from "./service/logger";
import {Request, Response} from "express";

@Route("/api")
export  class UserController extends BaseController {

    private readonly logger?: ILogger;

    constructor (logger?: ILogger) {
        super();
        this.logger = logger;
        console.log("from service");
    }

    @HttpGet("/file")
    getFile (req: Request, res: Response){
        res.json({ data : "hello" });
    }

    printer() {
        this.logger?.log("Jell");
    }
}