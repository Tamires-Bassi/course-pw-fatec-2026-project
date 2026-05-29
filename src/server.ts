import app from "./app" // Importando as configurações do servidor Express, que estão no arquivo "app.ts"
import dotenv from "dotenv" // Importando o dotenv para ler as variáveis de ambiente do arquivo .env
import { AppDataSource } from "./DataBase/data-source"; // Importando o AppDataSource para acessar o banco de dados

// Carrega as configurações do arquivo .env para que possamos usar as variáveis de ambiente
dotenv.config();

// Definindo o host e a porta onde o servidor irá rodar
const HOST = "localhost";
const PORT = process.env.PORT; // Pegar a porta do arquivo .env, ou deixar indefinida para usar a porta padrão do sistema operacional

// ========================================================================
// Iniciando  conexão com o banco de dados
// ========================================================================

AppDataSource.initialize()
    .then(async () => {
        console.log("📦 Banco de dados conectado com sucesso!");

        // Só liga o servidor depois que o banco de dados conectar
        // O comando 'listen' é o que efetivamente liga o servidor e fica escutando as requisições
        app.listen(PORT, () => {
            console.log("-----------------------------------------");
            console.log("🚀 AGORA VAI! API ATUALIZADA!");
            console.log("-----------------------------------------");
            console.log(`📡 API (v1): http://${HOST}:${PORT}/api/v1`);
            console.log(`💓 Health Check: http://${HOST}:${PORT}/status`);
            console.log("-----------------------------------------");
            console.log("💡 Press CTRL+C to stop the server\n");
        });
    })
    .catch((error) => {
        console.error("❌ Erro ao conectar no banco de dados:", error);
    });