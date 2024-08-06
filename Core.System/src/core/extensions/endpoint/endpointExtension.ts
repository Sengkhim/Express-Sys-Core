
export {};

declare global {
    interface IService {
        
        addCore(): void;

        add(): void;
    }

    interface Number {
        toString(): string;
    }
}
