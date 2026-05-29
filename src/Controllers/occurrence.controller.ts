import { Request, Response } from "express";
import { OccurrenceRepository } from "../Repositories/occurrence.repository";
import { CreateOccurrenceSchema, UpdateOccurrenceSchema, Occurrence } from "../Models/occurrence.model";
import { z } from "zod";

// Instanciamos o repositório para usá-lo dentro de toda a classe
const occurrenceRepository = new OccurrenceRepository();

// ============================================================================
// Criando o Controller das Ocorrências
// ============================================================================

export class OccurrenceController {
    
    // ========================================================================
    // Busca todas as ocorrências/alertas de roubo
    // ========================================================================

    async getAll(req: Request, res: Response) {
        // O repositório já está configurado para trazer os dados do carro roubado junto
        const occurrences = await occurrenceRepository.findAll();
        res.status(200).json(occurrences);
    }

    // ========================================================================
    // Busca uma ocorrência específica pelo ID
    // ========================================================================

    async getByUuid(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const occurrence = await occurrenceRepository.findByUuid(uuid);
            
            if (!occurrence) {
                res.status(404).json({ message: "Ocorrência não encontrada" });
                return;
            }
            res.status(200).json(occurrence);
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // ========================================================================
    // Registra uma nova ocorrência de roubo/furto
    // ========================================================================

    async create(req: Request, res: Response) {
        try {
            // O Zod garante que campos obrigatórios não venham vazios
            const validatedData = CreateOccurrenceSchema.parse(req.body);
            const newOccurrence = await occurrenceRepository.create(validatedData as Occurrence);
            res.status(201).json(newOccurrence);
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // ========================================================================
    // Atualiza uma ocorrência
    // ========================================================================

    async update(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const validatedData = UpdateOccurrenceSchema.parse(req.body) as Partial<Occurrence>;
            const updatedOccurrence = await occurrenceRepository.update(uuid, validatedData);
            
            if (!updatedOccurrence) {
                res.status(404).json({ message: "Ocorrência não encontrada" });
                return;
            }
            res.status(200).json(updatedOccurrence);
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // ========================================================================
    // Deleta uma ocorrência
    // ========================================================================

    async delete(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const success = await occurrenceRepository.delete(uuid);
            
            if (!success) {
                res.status(404).json({ message: "Ocorrência não encontrada" });
                return;
            }
            res.status(204).send();
        } 
        
        catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}