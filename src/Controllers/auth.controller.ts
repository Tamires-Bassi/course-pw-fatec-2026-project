import { Request, Response } from "express"; // Tipos para lidar com os pedidos
import jwt from "jsonwebtoken"; // Biblioteca que cria o Token JWT
import dotenv from "dotenv"; // Ferramenta para les arquivo na pasta .env

// Carrega as configurações do .env para a memória do servidor
dotenv.config();

// ============================================================================
// Criando o Controller de Autentificação
// ============================================================================

export class AuthController {

    // ============================================================================
    // Função de loging do usuário
    // ============================================================================

    login(req: Request, res: Response) {
        // Pega o usuário e a senha que o cliente enviou no corpo do pedido (req.body)
        const { username, userpass } = req.body;

        // Verifica se o cliente esqueceu de digitar algum dos dois
        if (!username || !userpass) {
            // Se esqueceu, devolve o código 401 (Não Autorizado) com uma mensagem de erro
            res.status(401).json({ error: "Usuário e/ou senha não informados" });
            return;
        }

        // Verifica se as credenciais batem com as do .env
        if (username != process.env.DEFAULT_USERNAME || userpass != process.env.DEFAULT_USERPASS) {
            // Se errar a senha ou o usuário, bloqueia o acesso
            res.status(401).json({ error: "Usuário e/ou senha inválidos" });
            return;
        }

        // Cria o Token JWS
        const token = jwt.sign(
            { "username": username }, // Informação pública guardada dentro do token
            String(process.env.JWT_SECRET), // Assina o token com a senha do .env
            { expiresIn: "1h" } // Regra de segurança, o token perde a validade sozinho em 1 hora
        );

        // Devolve o token pronto para o cliente com status 200 (Sucesso)
        res.status(200).json({
            "message": "Login realizado com sucesso!",
            "token": token
        });
    }

}