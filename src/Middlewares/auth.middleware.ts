import { Request, Response, NextFunction } from "express"; // Tipos do Express para a Requisição (req), Resposta (res) e a função de liberar a porta (next)
import jwt from "jsonwebtoken" // Biblioteca que sabe ler e validar os Tokens JWT
import dotenv from "dotenv" // Biblioteca que lê o arquivo .env

// Abre o .env e carrega as variáveis de ambiente para a memória
dotenv.config()

export class AuthMiddleware { 

    // ====================================================================================
    // JWT ( Usa o Token gerado no login)
    // ====================================================================================

    public loginWithJWT(req: Request, res: Response, next: NextFunction): void { 
        // Pega a linha de autorização do cabeçalho
        const authHeader = req.headers.authorization; 
        
        // Se a pessoa não enviou o cabeçalho Auth, barra
        if (!authHeader) { 
            res.status(401).json({error: "Autenticação inválida!"}); 
            return; 
        } 
        
        // O comando .split(' ') corta no espaço separando em duas variáveis de uma vez só!
        const [authType, authValue] = authHeader.split(' '); 
        
        // Se a primeira palavra não for "Bearer" OU a segunda palavra (o token) não existir, barra
        if (authType != "Bearer" || !authValue) { 
            res.status(401).json({error: "Autenticação inválida!"}); 
            return; 
        } 
        
        // O bloco "try/catch" tenta rodar um código perigoso. Se der erro, ele captura no "catch" para o servidor não explodir
        try { 
            // O comando jwt.verify tenta decifrar o token usando a mesma Senha Secreta do .env
            // Se o token foi alterado ou for falso, essa linha dá um erro imediato e pula pro catch
            jwt.verify(authValue, String(process.env.JWT_SECRET)); 
            
        } catch (error) {  
            // Descobre se falhou porque o tempo de 1 hora acabou (TokenExpiredError)
            if (error instanceof jwt.TokenExpiredError) { 
                res.status(401).json({error: "Token expirado!"}); 
            } else { 
                // Ou se falhou porque o token é inventado/falso
                res.status(401).json({error: "Token inválido!"}); 
            } 
            return; // Encerra a função barrando o usuário
        } 
        
        // O comando next() libera a catraca e deixa a requisição chegar até o nosso Controller de Veículos/Ocorrências
        next(); 
    } 
}