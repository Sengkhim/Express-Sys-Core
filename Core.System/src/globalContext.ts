
import {NextFunction, Request, Response} from "express";

declare global {
    namespace Express {
        interface Request {
            controller: any;
        }
    }
}

export function useMapController(controller: any, key: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        req.controller = new controller(key);
        next();
    };
}