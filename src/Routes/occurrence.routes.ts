import express from "express";
import { OccurrenceController } from "../Controllers/occurrence.controller";

// Cria Router onde será anotado qual URL (endereço web) aciona qual função
const router = express.Router();
// Instancia o controller, criando uma cópia dele para podermos dar ordens
const occurrenceController = new OccurrenceController();


// ============================================================================
// Rotas do Método GET, usado apenas para buscar informações
// ============================================================================

// Rota para buscar todas as ocorrências cadastradas no sistema 
router.get("/", (req, res) => occurrenceController.getAll(req, res));
// Rota para buscar uma ocorrência específica usando o ID
router.get("/:uuid", (req, res) => occurrenceController.getByUuid(req, res));

// ============================================================================
// Rotas do Método POST, usado para salvar novos dados no BD
// ============================================================================

// Quando o cliente envia os dados cultos no corpo (body) do pedido
router.post("/", (req, res) => occurrenceController.create(req, res));

// ============================================================================
// Rotas do Mérodo PUT/PATCH, usado para editar um dado que já existe
// ============================================================================

// O ':uuid' na URL é usado para saber qual ocorrência exata atualizar
router.put("/:uuid", (req, res) => occurrenceController.update(req, res));
router.patch("/:uuid", (req, res) => occurrenceController.update(req, res));

// ============================================================================
// Rotas do Método DELETE , usado para apagar registros
// ============================================================================

router.delete("/:uuid", (req, res) => occurrenceController.delete(req, res));

// Exporta os caminhos pronto
export default router;