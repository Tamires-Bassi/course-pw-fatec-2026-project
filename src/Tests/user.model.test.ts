import { CreateUserSchema } from "../Models/user.model";

// 'describe' agrupa os testes de um mesmo assunto
describe("Testes Unitários - Schema de Usuários", () => {

    // ============================================================================
    // Teste com sucesso
    // ============================================================================

    // 'it' é o teste em si (O que ele deve fazer?)
    it("Deve validar com sucesso um usuário com dados corretos", () => {
        // Preparando os dados
        const validUser = {
             name: "joao_silva",
             cpf: "12345678901",
             contact: "800-555-777",
             password: "senha_segura_123"
        };

        // Executando a função que queremos testar (safeParse do Zod)
        const result = CreateUserSchema.safeParse(validUser);

        // Verificamndo se o resultado foi o esperado (success deve ser true)
        expect(result.success).toBe(true);
    });

    // ============================================================================
    // Teste com falha
    // ============================================================================

    it("Deve dar erro se tentar criar um usuário com senha menor que 6 caracteres", () => {
        // Preparando os dados (senha propositalmente errada)
        const invalidUser = {
            name: "joao_silva",
            cpf: "12345678901",
            contact: "800-555-777",
            password: "123"
        };

        // Executando a validação
        const result = CreateUserSchema.safeParse(invalidUser);

        // O esperado é que a validação FALHE (success deve ser false)
        expect(result.success).toBe(false);
    });

});