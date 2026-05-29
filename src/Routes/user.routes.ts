import express from "express";
import { UserController } from "../Controllers/user.controller";

// Cria o Router de endereços para os usuários
const router = express.Router();
// Instancia o controller, criando uma cópia dele para podermos dar ordens
const userController = new UserController();

// ============================================================================
// Rotas do Método GET, usado apenas para buscar informações
// ============================================================================

// Rota para buscar todos osusuários
router.get("/", (req, res) => userController.getAll(req, res));
// Rota para buscar um carro específico pelo seu ID
router.get("/:uuid", (req, res) => userController.getByUuid(req, res));
// Busca um usuário pelo username
router.get("/username/:username", (req, res) => userController.getByUsername(req, res));

// ============================================================================
// Rotas do Método POST, usado para salvar novos dados no BD
// ============================================================================

// Rota para criar um usuário novo
router.post("/", (req, res) => userController.create(req, res));

// ============================================================================
// Rotas do Mérodo PUT, usado para editar um dado que já existe
// ============================================================================

// Rotas para arualizar os dados de um usuário existente
router.put("/:uuid", (req, res) => userController.update(req, res));

// ============================================================================
// Rotas do Método DELETE , usado para apagar registros
// ============================================================================

// Rota para deletar um usuário do banco de dados
router.delete("/:uuid", (req, res) => userController.delete(req, res));

// Exporta as rotas para o index.ts poder usá-las
export default router;