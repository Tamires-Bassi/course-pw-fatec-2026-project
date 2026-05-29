import { DataSource } from "typeorm"; // Importando a ferramenta principal que cria e gerencia a conexão com o banco de dados
import dotenv from "dotenv" // Importando o dotenv para ler as variáveis de ambiente do arquivo .env

// Acionando o "dotenv" para carregar as variáveis de ambiente
dotenv.config();

// ============================================================================
// Configurando a conexão com a banco de dados
// ============================================================================

// Criando e configurando o AppDataSource
export const AppDataSource = new DataSource({
    // Informando o tipo de banco de dados que estamos usando
    type: "postgres",
    // Informando o host do banco de dados
    // O "process.env.DB_HOST" tenta pegar a informação do arquivo .env
    // Se a variável de ambiente não existir, ele usa "localhost" como padrão
    host: process.env.DB_HOST || "localhost",
    // Informando a porta do banco de dados
    port: parseInt(process.env.DB_PORT || "5432"), // O parseInt transforma o texto da porta em um número matemático, que é o formato exigido
    // Informando o nome de usuário do banco de dados
    username: process.env.DB_USERNAME || "postgres",
    // Informando a senha do banco de dados (tenta buscar no cofre, senão deixa vazio)
    password: String(process.env.DB_PASSWORD || ""),
    // Informando o nome do banco de dados específico onde vamos guardar as nossas tabelas
    database: process.env.DB_NAME || "",
    // Sincronização automática das tabelas do banco com as classes do código
    synchronize: true, // Usando "true" para o Render criar as tabelas sozinho
    // Dezativando os logs de SQL no console ára não poluir a saída
    logging: false,
    // Dizendo onde estão as entidades do BD
    entities: ["src/Models/*.ts"], // O "*.ts" significa que ele deve ler qualquer arquivo que termine com ".ts" dentro da pasta "Models"
    // Dizendo onde estão as migrações do BD, os históricos de mudanças estruturais do banco
    migrations: ["src/DataBase/Migrations/*.ts"]
});