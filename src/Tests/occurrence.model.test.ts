import { CreateOccurrenceSchema } from "../Models/occurrence.model";

describe("Testes Unitários - Schema de Ocorrências", () => {
    
    // ========================================================================
    // Teste com sucesso
    // ========================================================================

    it("Deve validar com sucesso uma ocorrência com dados corretos", () => {
        const validOccurrence = {
            vehicleId: "123e4567-e89b-12d3-a456-426614174000",
            status: "Roubado", // Status correto da lista
            dateOccurrence: "2026-05-29T10:00:00.000Z", // Data em formato válido
            boNumber: "BO-12345",
            description: "Veículo roubado na rua principal durante a madrugada"
        };

        const result = CreateOccurrenceSchema.safeParse(validOccurrence);
        expect(result.success).toBe(true);
    });

    // ========================================================================
    // Testes com falha
    // ========================================================================
    it("Deve dar erro se tentar enviar um status que não existe no sistema", () => {
        const invalidStatus = {
            vehicleId: "123e4567-e89b-12d3-a456-426614174000",
            status: "Perdido", // Status inventado (o Zod só aceita Roubado, Furtado ou Recuperado)
            dateOccurrence: "2026-05-29T10:00:00.000Z",
            boNumber: "BO-12345",
            description: "Veículo perdido"
        };

        const result = CreateOccurrenceSchema.safeParse(invalidStatus);
        expect(result.success).toBe(false);
    });

    it("Deve dar erro se a descrição for muito curta", () => {
        const shortDescription = {
            vehicleId: "123e4567-e89b-12d3-a456-426614174000",
            status: "Furtado",
            dateOccurrence: "2026-05-29T10:00:00.000Z",
            boNumber: "BO-12345",
            description: "Oi" // Errado (mínimo de 5 caracteres exigido pelo seu código)
        };

        const result = CreateOccurrenceSchema.safeParse(shortDescription);
        expect(result.success).toBe(false);
    });
});