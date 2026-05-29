import { Request, Response, NextFunction } from "express";

export class LoggerMiddleware {
    // Logar as requisições no console, msotrando a data, o método e o caminho da requisição
    logInConsole(req: Request, res: Response, next: NextFunction) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    }
}