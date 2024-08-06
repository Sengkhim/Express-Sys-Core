
import {RequestHandler, Request, Response, NextFunction} from "express";
import "reflect-metadata";

export function ApiController (routePrefix: string): Function {
    return function (target: Function): void {
        for (const key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata("path", target.prototype, key);
            const method: string = Reflect.getMetadata("method", target.prototype, key);

            if (path && method) {
                const fullPath = `${routePrefix}${path}`;
                const middleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        await routeHandler(req, res, next);
                    } catch (err) {
                        next(err);
                    }
                };

                // Register route handler middleware with Express based on method
                // if (method === "get") {
                //     router.get(fullPath, middleware);
                // }
                // Register handlers for other HTTP methods as needed
            }
        }
    };
}
