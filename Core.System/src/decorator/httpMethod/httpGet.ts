import "reflect-metadata";

function httpMethodBuilder(method: string) {
    return function (path: string) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            Reflect.defineMetadata("path", path, target, propertyKey);
            Reflect.defineMetadata("method", method, target, propertyKey);
        };
    };
}

export function Route(prefix: string) {
    return function (target: Function): void {
        Reflect.defineMetadata('route', prefix, target);
    };
}


export const HttpGet = httpMethodBuilder("GET");
