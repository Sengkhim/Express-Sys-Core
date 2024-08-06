import {Project, ScriptTarget} from "ts-morph";

export const Reflection: Project = new Project({
    compilerOptions: {
        exclude: ["node_modules"],
        outDir: "./dist",
        rootDir: "src",
        allowJs: true,
        target: ScriptTarget.ES2016,
        lib: ["es5","es6","dom"]
    }
});
