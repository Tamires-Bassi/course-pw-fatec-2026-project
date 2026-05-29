import { CreateVehicleSchema } from "../Models/vehicle.model";

// Agrupa os testes de veículos
describe("Testes Unitários - Schema de Veículos", () => {
    
    // ========================================================================
    // Teste com sucesso
    // ========================================================================

    it("Deve validar com sucesso um veículo com dados corretos", () => {
        const validVehicle = {
            ownerId: "123e4567-e89b-12d3-a456-426614174000", // UUID válido simulado
            licensePlate: "ABC1D23", // Exatamente 7 caracteres
            renavam: "12345678901", // Exatamente 11 dígitos
            model: "Honda Civic",
            state: "SP", // Exatamente 2 caracteres
            city: "São Paulo"
        };

        const result = CreateVehicleSchema.safeParse(validVehicle);
        expect(result.success).toBe(true);
    });

    // ========================================================================
    // Testes com falha
    // ========================================================================

    it("Deve dar erro se tentar criar um veículo com placa de tamanho incorreto", () => {
        const invalidLicencePlate = {
            ownerId: "123e4567-e89b-12d3-a456-426614174000",
            licensePlate: "ABC12", // Placa propositalmente errada (menos de 7)
            renavam: "12345678901",
            model: "Honda Civic",
            state: "SP",
            city: "São Paulo"
        };

        const result = CreateVehicleSchema.safeParse(invalidLicencePlate);
        expect(result.success).toBe(false); // Esperamos que dê erro!
    });

    it("Deve dar erro se a sigla do estado tiver mais de 2 letras", () => {
        const invalidState = {
            ownerId: "123e4567-e89b-12d3-a456-426614174000",
            licensePlate: "ABC1D23",
            renavam: "12345678901",
            model: "Honda Civic",
            state: "SAO PAULO", // Estado propositalmente errado (mais de 2)
            city: "São Paulo"
        };

        const result = CreateVehicleSchema.safeParse(invalidState);
        expect(result.success).toBe(false); // Esperamos que dê erro!
    });
});