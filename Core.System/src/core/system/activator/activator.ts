export class Activator {

    public static createInstance (type: any): any {
        // if (type instanceof Object)
        return new type[Object.keys(type)[0]]();
    }
}