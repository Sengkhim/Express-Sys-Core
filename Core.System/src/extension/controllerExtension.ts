import express, {application} from "express";
import * as path from "path";
import {ClassDeclaration, Project, SourceFile} from "ts-morph";
import ApiControllerMetadata from "../core/system/metadata/apiControllerMetadata";
import {Activator} from "../core/system/activator/activator";
import {Reflection} from "../core/system/reflection/reflection";
import {Application, Express} from "express-serve-static-core";

async function resolveControllers (sourceFile: SourceFile): Promise<ApiControllerMetadata[]> {
    const apiControllerInstances: ApiControllerMetadata[] = [];
    for (const classDeclaration of sourceFile.getClasses()) {
        if (classDeclaration.getName()?.includes("FileController") &&
            classDeclaration.getBaseClass()?.getName()?.includes("BaseController")) {
            const filePath: string = path.join("..", "Core", "Abstract", "Controller", `${classDeclaration.getName()}`);
            const createInstance = Activator.createInstance(await import(filePath));
            apiControllerInstances.push(new ApiControllerMetadata(classDeclaration, createInstance));
        }
    }
    // console.log(apiControllerInstances);
    return apiControllerInstances;
}

export async function addCoreControllers (project: Project): Promise<void> {

    for (const sourceFile of project.getSourceFiles()) {
       await resolveControllers(sourceFile);
    }
}

export function mapControllers (app: express.Application) {

    Reflection.addSourceFilesAtPaths(
        `${path.join(__dirname, "../../Src")}/**/*.ts`
    );


    // for (const sourceFile of sourceFiles) {
    //     for (const classNode of sourceFile.getClasses()) {
    //
    // if (classNode.getDecorator("ApiController")) {
    //     // const decorator = classNode.getDecorator("ApiController");
    //     // const routePrefix = decorator!
    //     //     .getArguments()[0]
    //     //     .getText()
    //     //     .replace(/["']/g, "");
    //
    //     const router = express.Router();
    //
    //     // Get the class name
    //     const className = classNode.getName() || "";
    //
    //     require(sourceFile.getFilePath());
    //     // const controllerClass = controllerModule.default || controllerModule;
    //
    //
    //     mapRoutes(router, classNode, new UserController())
    //
    //     app.use("/api", router);
    // }
    //     }
    // }
}

function mapRoutes (
    router: express.Router,
    classNode: ClassDeclaration,
    controllerInstance: any
) {
    // Find methods with HTTP method decorators
    classNode.getMethods().forEach((methodNode) => {
        let httpMethod: string | undefined = undefined;
        if (methodNode.getDecorator("HttpGet")) httpMethod = "get";
        // Add more decorators as needed

        if (httpMethod) {
            const routePath =
                methodNode.getDecorator(httpMethod)?.getArguments()[0].getText().replace(/["']/g, "") || "/";

            // Map route to the corresponding method
            (router as any)[httpMethod](
                routePath,
                (req: express.Request, res: express.Response) => {
                    // Call the method dynamically
                    (controllerInstance as any)[methodNode.getName()](req, res);
                }
            );
        }
    });
}
