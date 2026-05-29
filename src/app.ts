import express, { Request, Response } from "express"; // Importando a ferramenta principal para criar o servidor e lidar com as requisições
import routes from "./Routes/index"; // Importando o mapa de rotas da API
import { LoggerMiddleware } from "./Middlewares/logger.middleware"; // importando a classe do Logger

// Criando uma instância do Express, que é o nosso servidor
const app = express(); 
// Criando uma instância do LoggerMiddleware para usar o middleware de log
const loggerMiddleware = new LoggerMiddleware();

// Ensina a API a entender requisições que chegam no formato JSON
app.use(express.json());
// Ativa o middleware de log para todas as rotas
app.use(loggerMiddleware.logInConsole);
// Ativa o gerenciador de rotas principal
app.use("/api/v1", routes);

// ========================================================================
// Rota de Health Check (O "Teste de Fogo")
// ========================================================================

app.get("/status", (req: Request, res: Response) => {
    const status = {
        "status": 'ONLINE',
        "message": 'API is running normally',
        "timestamp": new Date().toISOString(),
    };
    res.status(200).json(status); // Devolve a resposta com sucesso (200)
});

// ========================================================================
// Rota de Fallback (Para qualquer endereço digitado errado)
// ========================================================================
app.use((req: Request, res: Response) => {
    const err = {
        error: {
            code: 'NOT_FOUND',
            message: `Endpoint not found at ${req.originalUrl}`
        }
    };
    res.status(404).json(err); // Devolve a resposta de Não Encontrado (404)
});

// Exportando o "app" para que ele possa ser usado em outros arquivos
export default app;