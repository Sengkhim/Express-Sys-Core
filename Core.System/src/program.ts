import express, {NextFunction, Request, Response} from 'express';
import {UserController} from "./userController";

export interface IUserService {

    getAll(): Array<string>;
}
export class UserService implements IUserService {
    getAll(): Array<string> {
        return ["User1", "User2"];
    }
}

interface IFile {

    getFile(): string;
}

class FileProvider implements IFile {

    getFile(): string {
        return "D://user/me";
    }

}

class FileProviderController {

    private readonly _file: IFile;
    constructor(file: IFile) {
        this._file = file;
    }

    getUsers(req: Request, res: Response) {
        try {
            res.json(this._file.getFile());
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const app = express();
const PORT = 3000;

app.use(mapControllers(FileProviderController));

// Start the server
app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function mapControllers(Controller: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Inject service into UserController
        const service: IFile = new FileProvider();
        req.controller = new Controller(service);
        next();
    };
}

// function mapController(app: Express): void {
//    
//     app.use(useMapController.call(null, UserController, new UserService()));
//    
//     app.get('/users', (req: Request, res: Response): void => {
//         req.controller.getUsers(req, res)
//     });
// }

