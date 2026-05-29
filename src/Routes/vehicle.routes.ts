import express from "express"; // Principal ferramenta criar o servidor
import { VehicleController } from "../Controllers/vehicle.controller"; // Importando o controlador dos veículos que buscar, criar e deletar carros

// Cria Router onde será anotado qual URL (endereço web) aciona qual função
const router = express.Router();
// Instancia o controller, criando uma cópia dele para podermos dar ordens
const vehicleController = new VehicleController();

// ============================================================================
// Rotas do Método GET, usado apenas para buscar informações
// ============================================================================

// Rota para buscar todos os carros
router.get("/", (req, res) => vehicleController.getAll(req, res)); // Quando o usuário acessar a rota raiz ("/") usando GET, chamamos a função getAll
// Rota para buscar um carro específico pelo seu ID
router.get("/:uuid", (req, res) => vehicleController.getByUuid(req, res)); // Os dois pontos (":uuid") avisam a rota que isso é uma variável. 
// Rota especial para buscar pela placa
router.get("/placa/:placa", (req, res) => vehicleController.getByPlaca(req, res)); // O '/placa' é usado para não confundir com a rote de UUID

// ============================================================================
// Rotas do Método POST, usado para salvar novos dados no BD
// ============================================================================

// Quando bater na rota raiz ("/") enviando dados via POST, chama a função create
router.post("/", (req, res) => vehicleController.create(req, res));

// ============================================================================
// Rotas do Mérodo PUT/PATCH, usado para editar um dado que já existe
// ============================================================================

// Os dados novos virão ocultos no corpo da requisição.
router.put("/:uuid", (req, res) => vehicleController.update(req, res)); // Usamos o ':uuid' para saber qual carro será atualizado

// ============================================================================
// Rotas do Método DELETE , usado para apagar registros
// ============================================================================

// Usamos o ':uuid' para saber qual carro será deletado
router.delete("/:uuid", (req, res) => vehicleController.delete(req, res));

// Exporta as rotas
export default router;