import express from "express";
import { AuthMiddleware } from "../Middlewares/auth.middleware";  // Importando a classe de seguirança AuthMiddleware

// Importamos as rotas
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import vehicleRoutes from "./vehicle.routes";
import occurrenceRoutes from "./occurrence.routes";

// Criando o Gerenciador dae rotas principal
const router = express.Router();
// Instanciando o middleware de autenticação para usar nas rotas que precisam de proteção
const authMiddleware = new AuthMiddleware();

// ============================================================================
// Criando o mapa da API, ligando os prefixos da URL aos arquivos
// ============================================================================

// Tudo que começar com "/auth"  vai para a rota de login
router.use("/auth", authRoutes);
// Tudo que começar com "/users" vai para a rota de usuários
router.use("/users", userRoutes);
// Tudo que começar com "/vehicles" vai para a rota de veículos
router.use("/vehicles", authMiddleware.loginWithJWT, vehicleRoutes);
// Tudo que começar com "/occurrences" vai para a rota de ocorrências de roubo
router.use("/occurrences", authMiddleware.loginWithJWT, occurrenceRoutes);

// Exportamos esse Gerente com o mapa pronto
// O seu arquivo 'app.ts' vai pegar esse gerente e conectá-lo na porta principal do servidor
export default router;
