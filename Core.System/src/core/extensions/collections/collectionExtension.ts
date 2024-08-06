
export {};

declare global {
    interface Set<T> {
        toArray(): T[];
    }
}

Set.prototype.toArray = function <T>(): T[] {
    return Array.from(this);
};