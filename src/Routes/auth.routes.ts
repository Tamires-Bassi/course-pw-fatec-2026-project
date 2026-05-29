import express from "express";
import { AuthController } from "../Controllers/auth.controller";

const router = express.Router();
const authController = new AuthController();

// ============================================================================
// Rotas do Método POST, usado para salvar novos dados no BD
// ============================================================================

// Enviar senhas na URL (GET) é extremamente inseguro
// Já p POST permite que o cliente envie o 'username' e o 'userpass' bem escondidos entro do corpo (body) da requisição 
router.post("/login", (req, res) => authController.login(req, res)); // e a resposta (res) e entregar na mão da função 'login'

export default router;