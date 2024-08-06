
import {ClassDeclaration, SourceFile} from "ts-morph";
import {IMetadata} from "../../interface/metadata";
import {Reflection} from "../reflection/reflection";

export default class ApiControllerMetadata implements IMetadata {

    private readonly classInfo: ClassDeclaration;
    private readonly instance: Function;

    constructor(classInfo: ClassDeclaration, instance: Function) {
        this.classInfo = classInfo;
        this.instance = instance;
    }

    public getClassInfo(): ClassDeclaration {
        return this.classInfo;
    }

    public getMemberInfo(): Function {
        return this.instance;
    }

    public getSourceFile (): SourceFile[] {
        return Reflection.getSourceFiles();
    }
}
