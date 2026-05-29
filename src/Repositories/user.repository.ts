import { AppDataSource } from "../DataBase/data-source"; // Importando o AppDataSource para acessar o banco de dados
import { User } from "../Models/user.model"; // Importando a classe User, que representa a tabela de usuários no banco de dados


// ========================================================================
// Criando o repositório de usuários
// ========================================================================

export class UserRepository {
    // Criando a conexão direta com a tabela 'users' usando o TypeORM
    private repository = AppDataSource.getRepository(User);

    // ============================================================================
    // Buscando todos os usuários cadastrados
    // ============================================================================

    async findAll(): Promise<User[]> {
        // O 'await' é usado para esperar a resposta do BD antes de continuar
        return await this.repository.find(); 
    }

    // ============================================================================
    // Buscando um usuário específico pelo ID
    // ============================================================================

    async findByUuid(uuid: string): Promise<User | null> {
        // O 'findOneBy' é a forma mais simples de buscar um registro com base em uma coluna específica
        return await this.repository.findOneBy({ uuid })
    }

    // ============================================================================
    // Buscando um usuário pelo nome de usuário (útil para o login)
    // ============================================================================

    async findByUsername(name: string): Promise<User | null> {
        return await this.repository.findOneBy({ name });
    }

    // ============================================================================
    // Criando e salvando um novo usuário no banco de dados
    // ============================================================================

    async create(userData: Partial<User>): Promise<User> {
         // O 'create' prepara o novo usuário, mas ainda não salva no banco
        const newUser = this.repository.create(userData);
        // O 'save' é o que realmente salva o novo usuário no BD e retorna o usuário completo, incluindo o ID gerado
        return await this.repository.save(newUser); 
    }

    // ============================================================================
    // Atualizando um usuário existente
    // ============================================================================

    async update(uuid: string, updatedData: Partial<User>): Promise<User | null> {
        // Primeiro, vemos se o usuário realmente existe no banco
        const user = await this.findByUuid(uuid);
        
        // Se o usuário não existir, retorna null para indicar que a atualização não foi possível
        if (!user) return null;
        
        // O 'merge' pega os dados existentes e mistura com os novos dados fornecidos, atualizando apenas os campos que foram passados
        this.repository.merge(user, updatedData);

        // Salva as alterações permanentemente
        return await this.repository.save(user); 
    }

    // ============================================================================
    // Deletando um usuário
    // ============================================================================

    async delete(uuid: string): Promise<boolean> {
        // O .delete() vai direto no banco e apaga a linha que tem esse uuid
        const result = await this.repository.delete(uuid);
        // O 'affected' indica quantas linhas foram afetadas pela operação de delete. Se a quantidade de linhas afetadas for maior que 0, apagou com sucesso
        return result.affected !== 0 && result.affected !== null; 
    }
}
