export interface ILogger {
    log(msg: string) : void;
}

export class LoggerImpl implements ILogger {
    log (msg: string): void {
        console.log(msg);
    }
}

export class LoggerImplV2 implements ILogger {
    log (msg: string): void {
        console.log(msg);
    }
}