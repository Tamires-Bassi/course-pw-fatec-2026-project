import { Request, Response } from "express"; // Tipos para lidar com os pedidos (Request) e respostas (Response) da internet
import { UserRepository } from "../Repositories/user.repository"; // Gerenciamento do banco de dados
import { CreateUserSchema, UpdateUserSchema, User } from "../Models/user.model"; // Regras de validação
import { z } from "zod"; // Ferramenta de validação

// Instanciamos o repositório para usá-lo dentro de toda a classe
const userRepository = new UserRepository();

// ============================================================================
// Criando o Controller dos usuários
// ============================================================================

export class UserController {

    // ============================================================================
    // Buscar todos os usuários
    // ============================================================================

    async getAll(req: Request, res: Response) {
        // Pede ao repositório a lista completa de usuários do banco
        const users = await userRepository.findAll();
        // Devolve a lista para o cliente com o status 200
        res.status(200).json(users);
    }

    // ============================================================================
    // Buscar um usuário pelo ID
    // ============================================================================

    async getByUuid(req: Request, res: Response) {
        try {
            // Verifica se o que foi passado na URL (req.params.uuid) é um UUID válido
            const uuid = z.string().uuid().parse(req.params.uuid);
            // Pede ao repositório para procurar esse usuário específico
            const user = await userRepository.findByUuid(uuid);
            
            // Se não achar ninguém, devolve erro 404 (Não Encontrado)
            if (!user) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }
            // Se achou, devolve os dados com status 200
            res.status(200).json(user);
        } 

        catch (error) {
            // Se a validação do Zod falhar, dá erro 400
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            // Se for erro no banco, dá erro 500
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    
    // ============================================================================
    // Busca um usuário pelo nome de usuário
    // ============================================================================

    async getByUsername(req: Request, res: Response) {
        try {
            // Verifica se o que foi passado na URL (req.params.username) é um nome válido
            const username = z.string().parse(req.params.username);
            // Pede ao repositório para procurar esse usuário específico
            const user = await userRepository.findByUsername(username);
            
            // Se não achar ninguém, devolve erro 404 (Não Encontrado)
            if (!user) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }
            // Se achou, devolve os dados com status 200
            res.status(200).json(user);
        } 
        
        catch (error) {
            // Se a validação do Zod falhar, dá erro 400
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            // Se for erro no banco, dá erro 500
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // ============================================================================
    // Cria um novo usuário
    // ============================================================================

    async create(req: Request, res: Response) {
        try {
            // O Zod inspeciona os dados que vieram no corpo da requisição (req.body) 
            // e confere se a senha e o username não estão vazios
            const validatedData = CreateUserSchema.parse(req.body);
            // Se os dados estiverem perfeitos, manda o repositório salvar
            const newUser = await userRepository.create(validatedData as User);
            
            // Devolve os dados do usuário recém-criado com status 201 (Criado com Sucesso)
            res.status(201).json(newUser);
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // ============================================================================
    // Atualiza um usuário existente
    // ============================================================================

    async update(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            // Valida apenas as partes que foram enviadas para atualizar (Partial)
            const validatedData = UpdateUserSchema.parse(req.body) as Partial<User>;
            // Pede ao repositório para atualizar o usuário com os dados validos
            const updatedUser = await userRepository.update(uuid, validatedData);
            
            // Se não achar ninguém, devolve erro 404
            if (!updatedUser) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }
            res.status(200).json(updatedUser);
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // ============================================================================
    // deleta um usuário
    // ============================================================================

     async delete(req: Request, res: Response) {
        try {
            // Pega o UUID da URL e verifica se esse dado é válido
            const uuid = z.string().uuid().parse(req.params.uuid);
            // Manda o repositório excluir
            const success = await userRepository.delete(uuid);
            
            if (!success) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }
            // Devolve 204 (No Content) se a exclusão for bem sucedida
            res.status(204).send();
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}