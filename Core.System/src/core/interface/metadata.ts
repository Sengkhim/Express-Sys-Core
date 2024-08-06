import {SourceFile} from "ts-morph";

export interface IMetadata {

    getSourceFile() : SourceFile[];
}