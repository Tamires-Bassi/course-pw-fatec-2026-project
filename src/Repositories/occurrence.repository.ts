import { AppDataSource } from "../DataBase/data-source";
import { Occurrence } from "../Models/occurrence.model";

// ========================================================================
// Criando o repositório de veículos
// ========================================================================

export class OccurrenceRepository {
    private repository = AppDataSource.getRepository(Occurrence);
    
    // ============================================================================
    //Buscando todas as ocorrências cadastradas
    // ============================================================================

    async findAll(): Promise<Occurrence[]> {
        return await this.repository.find({
            relations: {vehicle: true} // Travendo, também, os detalhes do carro roubado associado a ocorrência
        });
    }

    // ============================================================================
    // Buscando uma ocorrência específica pelo ID
    // ============================================================================

    async findByUuid(uuid: string): Promise<Occurrence | null> {
        return await this.repository.findOne({
            where: { uuid: uuid },
            relations: {vehicle: true}
        });
    }

    // ============================================================================
    // Crando e salvando um novo veículo no BD
    // ============================================================================
    
    async create(occurrenceData: Partial<Occurrence>): Promise<Occurrence> {
        const newOccurrence = this.repository.create(occurrenceData);
        return await this.repository.save(newOccurrence);
    }

    // ============================================================================
    // Atualizando uma ocorrêmcia existente
    // ============================================================================

    async update(uuid: string, updatedData: Partial<Occurrence>): Promise<Occurrence | null> {
        // Verifica se a ocorrência existe
        const occurrence = await this.findByUuid(uuid);
        if (!occurrence) return null; 

        // Aplica a alteração e salva
        this.repository.merge(occurrence, updatedData);
        return await this.repository.save(occurrence);
    }

    // ============================================================================
    // Deletando uma ocorrência
    // ============================================================================

    async delete(uuid: string): Promise<boolean> {
        const result = await this.repository.delete(uuid);
        return result.affected !== 0 && result.affected !== null; 
    }
}