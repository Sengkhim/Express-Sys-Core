
import {ClassDeclaration, Project, SourceFile} from "ts-morph";
import path from "path";

export abstract class BaseController {}

export function findDerivedClasses (rootDir: string): string[] {

    const project = new Project({
        compilerOptions: { exclude: ["node_modules"] }
    });

    const sourceFiles = project.addSourceFilesAtPaths(`${rootDir}/**/*.ts`);
    // project.addSourceFilesAtPaths(rootDir);
    const derivedClasses: string[] = [];

    // Filter out source files inside node_modules directory
    const filteredSourceFiles = sourceFiles.filter((sourceFile: SourceFile) => {
        const filePath = sourceFile.getFilePath();
        return !filePath.includes(`${path.sep}node_modules${path.sep}`);
    });

    filteredSourceFiles.forEach((sourceFile: SourceFile) => {
        sourceFile.getClasses().forEach((classDeclaration: ClassDeclaration) => {
            if(classDeclaration.getName()?.includes("UserController")) {
                // console.log(sourceFile.getFilePath());
                // classDeclaration.getMethods().forEach(m => console.log(m.getName()));
                console.log(classDeclaration.getConstructors()[0].getParameter(() => true)?.getName());
                // console.log(classDeclaration.getMethods().forEach(m => console.log(m.getName())));
            }
            // if (classDeclaration.getBaseTypes().find(baseType => baseType.getText() === baseClassName)) {
            //     derivedClasses.push(`${sourceFile.getFilePath()} => ${classDeclaration.getName()}`);
            // }
        });
    });

    return derivedClasses;
}
