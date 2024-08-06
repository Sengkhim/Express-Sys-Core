import {baseRoute} from "../../index";
import {Reflection} from "../../core/system/reflection/reflection";
import path from "path";
import {ClassDeclaration, ConstructorDeclaration, Decorator, Node, SourceFile, Type} from "ts-morph";
import {Activator} from "../../core/system/activator/activator";
import {WebApplicationBuilder} from "../../core/application/webApplication";
import IServiceProvider from "../../core/system/interface/serviceProvider";
import {LoggerImpl, LoggerImplV2} from "../../core/abstract/controller/service/logger";
import IApplicationBuilder from "../../core/application/builder/interface/applicationBuilder";

type RouteDescriptor = {
    path: string;
    method: string;
    function: Function;
}

const expressRouters: RouteDescriptor[] = [];

export function addApiControllerExploreV2 (services: WebApplicationBuilder): void {
    const sourcePath: string = path.join(__dirname, "../../../src/**/*.ts");
    const sourceFiles: SourceFile[] = Reflection.addSourceFilesAtPaths(sourcePath);
    sourceFiles.forEach((sourceFile: SourceFile): void => {
        sourceFile.getClasses().forEach((classInfo: ClassDeclaration) =>
            handleRemarkController(classInfo, services));
    });
}


export function useMapControllers (app: IApplicationBuilder): void {
    const sourcePath: string = path.join(__dirname, "../../../src/**/*.ts");
    const sourceFiles: SourceFile[] = Reflection.addSourceFilesAtPaths(sourcePath);
    sourceFiles.forEach((sourceFile: SourceFile): void => {
        sourceFile.getClasses().forEach((classInfo: ClassDeclaration): void => {
            classInfo.getBaseTypes().forEach(() => useMapRoute(classInfo, app));
        });
    });
}

export function useMapRoute (classInfo: ClassDeclaration, app: IApplicationBuilder): void {
    classInfo.getDecorators().forEach((decorator: Decorator): void => {
        decorator.getArguments().forEach((args: Node): void => {
            app.endpointSources.add({
                path: args.getText().replace(/"/g, ""),
                name: classInfo.getName()!
            });
        });
    });

    const filePath: string = path.join(__dirname, `../../core/abstract/controller/${classInfo.getName()}`);
    import(filePath).then((type): void => {
        const constructor: ConstructorDeclaration[] = classInfo.getConstructors();
        for (const parameters of constructor) {
            const implement: Type | null = app.serviceProvider.getService(parameters.getParameters()[0].getType());
            if (implement) {
                const filePath: string = path.join(__dirname, `../../core/abstract/controller/service/logger`);
                import(filePath).then((impl) => {
                    const instanceImpl = Activator.createInstance(impl);
                    const createInstance =  new type[Object.keys(type)[0]](new LoggerImplV2());
                    createInstance.printer();
                });
            }
        }
    });
}

function handleRemarkController (classInfo: ClassDeclaration, services: WebApplicationBuilder, serviceProvider?: IServiceProvider): void {
    classInfo.getBaseTypes().forEach(async (): Promise<void> => {
        if (classInfo.getName() && classInfo.getExtends()?.getText().includes("BaseController")) {
            const filePath: string = path.join(__dirname, `../../core/abstract/controller/${classInfo.getName()}`);
            const type = await import(filePath);
            // const createInstance = Activator.createInstance(await import(filePath));
            const constructor: ConstructorDeclaration[] = classInfo.getConstructors();
            for (const parameters of constructor) {
                // const implement: Type | null = serviceProvider!.getService(parameters.getParameters()[0].getType());
                // if (implement) {
                const filePath: string = path.join(__dirname, `../../core/abstract/controller/service/logger`);
                const instanceImpl = Activator.createInstance(await import(filePath)) as LoggerImpl;
                // console.log(instanceImpl);
                const createInstance = new type[Object.keys(type)[0]](instanceImpl);
                // console.log(createInstance);
                // classInfo.addConstructor({
                //
                // });
                // createInstance.getFile();
                // }
            }

        }
    });
}

export function addApiControllerExplore (controller: Function): void {
    const classInstance: ClassDecorator = new (controller as any)() as ClassDecorator;
    const memberInfo: string[] = Object.getOwnPropertyNames(classInstance.constructor.prototype);
    memberInfo.forEach((methodInfo: string): void => {
        const route: string = Reflect.getMetadata("route", classInstance.constructor);
        const method: string = Reflect.getMetadata("method", classInstance, methodInfo);
        let path = Reflect.getMetadata("path", classInstance, methodInfo);
        if (method && path) {
            path = route ? route.trim() + path : path;
            expressRouters.push({
                path: path,
                method: method,
                function: (classInstance as never)[methodInfo]
            });
        }
    });

    expressRouters.forEach((router: RouteDescriptor): void => {
        (baseRoute as any)[router.method.toLowerCase()](router.path, router.function);
    });
}
