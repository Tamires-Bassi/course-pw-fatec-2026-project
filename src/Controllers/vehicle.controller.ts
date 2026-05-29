import { Request, Response } from "express";
import { VehicleRepository } from "../Repositories/vehicle.repository";
import {CreateVehicleSchema, UpdateVehicleSchema, Vehicle } from "../Models/vehicle.model"; // Importamos a tabela e as regras de validação do Zod
import { z } from "zod";

// Instanciamos o repositório para usá-lo dentro de toda a classe
const vehicleRepository = new VehicleRepository();

// ============================================================================
// Criando o Controller dos veículos
// ============================================================================

export class VehicleController {
    
    // ========================================================================
    // Busca todos os veículos do sistema
    // ========================================================================

    async getAll(req: Request, res: Response) {
        const vehicles = await vehicleRepository.findAll();
        res.status(200).json(vehicles);
    }

    // ========================================================================
    // Busca um veículo específico pelo ID
    // ========================================================================

    async getByUuid(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const vehicle = await vehicleRepository.findByUuid(uuid);
            
            if (!vehicle) {
                res.status(404).json({ message: "Veículo não encontrado" });
                return;
            }
            res.status(200).json(vehicle);
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
    // Busca um veículo pela placa
    // ========================================================================

    async getByPlaca(req: Request, res: Response) {
        try {
            const placa = z.string().parse(req.params.placa);
            const vehicle = await vehicleRepository.findByPlaca(placa);
            
            if (!vehicle) {
                res.status(404).json({ message: "Nenhum veículo encontrado com esta placa" });
                return;
            }
            res.status(200).json(vehicle);
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
    // Cadastra um novo veículo
    // ========================================================================

    async create(req: Request, res: Response) {
        try {
            // O Zod verifica se todos os campos obrigatórios vieram corretos
            const validatedData = CreateVehicleSchema.parse(req.body);
            const newVehicle = await vehicleRepository.create(validatedData as Vehicle);

            res.status(201).json(newVehicle);
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
    // Atualiza os dados do veículo
    // ========================================================================

    async update(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const validatedData = UpdateVehicleSchema.parse(req.body) as Partial<Vehicle>;
            const updatedVehicle = await vehicleRepository.update(uuid, validatedData);
            
            if (!updatedVehicle) {
                res.status(404).json({ message: "Veículo não encontrado" });
                return;
            }
            res.status(200).json(updatedVehicle);
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
    // Deleta um veículo
    // ========================================================================

    async delete(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const success = await vehicleRepository.delete(uuid);
            
            if (!success) {
                res.status(404).json({ message: "Veículo não encontrado" });
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
