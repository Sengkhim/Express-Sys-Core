import {Request, Response} from "express";
import {IUserService} from "./program";

export class UserController {
    
    private readonly _userService: IUserService;
    
    constructor(userService: IUserService) {
        this._userService= userService;
    }
    
    public getUsers(req: Request, res: Response) {
        res.json({ date: this._userService.getAll() });
    }
}