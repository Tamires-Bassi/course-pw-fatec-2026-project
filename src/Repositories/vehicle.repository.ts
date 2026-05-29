import { AppDataSource } from "../DataBase/data-source";
import { Vehicle } from "../Models/vehicle.model";  

// ========================================================================
// Criando o repositório de veículos
// ========================================================================

export class VehicleRepository {
    // Criando a conexão direta com a tabela 'vehicles' usando o TypeORM
    private repository = AppDataSource.getRepository(Vehicle);

    // ============================================================================
    //Buscando todos os veículos cadastrados
    // ============================================================================

    async findAll(): Promise<Vehicle[]> {
        // O comando .find() busca todas as linhas da tabela.
        return await this.repository.find({
            relations: {owner: true} // O 'relations' é usado para dizer que queremos trazer os dados do dono junto com o veículo
        });
    }

    // ============================================================================
    // Buscando um veículo específico pelo ID
    // ============================================================================

    async findByUuid(uuid: string): Promise<Vehicle | null> {
        // O 'findOne()' busca apenas uma linha que corresponda ao ID fornecido, permite usar o 'where' e 'relations'
        return await this.repository.findOne({
            where: { uuid: uuid }, // Especificando a condição de busca
            relations: {owner: true}
        });
    }
    
    // ============================================================================
    // Buscando veículo pela placa
    // ============================================================================

    async findByPlaca(licensePlate: string): Promise<Vehicle | null> {
        return await this.repository.findOne({
            where: { licensePlate: licensePlate },
            relations: {owner: true}
        });
    }

    // ============================================================================
    // Crando e salvando um novo veículo no BD
    // ============================================================================

    async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
        const newVehicle = this.repository.create(vehicleData);
        return await this.repository.save(newVehicle);
    }

    // ============================================================================
    // Atualizando um veículo existente
    // ============================================================================

    async update(uuid: string, updatedData: Partial<Vehicle>): Promise<Vehicle | null> {
        // Verifica se a ocorrência existe
        const vehicle = await this.findByUuid(uuid);
        if (!vehicle) return null;

        // Aplica a alteração e salva
        this.repository.merge(vehicle, updatedData);
        return await this.repository.save(vehicle);
    }

    // ============================================================================
    // Deletando um veículo
    // ============================================================================

     async delete(uuid: string): Promise<boolean> {   
        const result = await this.repository.delete(uuid);
        return result.affected !== 0 && result.affected !== null; 
    }
}