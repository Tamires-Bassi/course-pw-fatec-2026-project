import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { z } from "zod";
import crypto from "crypto"; // Pacote nativo de segurança do Node para gerar um ID único
import { Vehicle } from "./vehicle.model"; // Importando o modelo do veículo para que o TypeORM saiba com quem conectar
 
// ============================================================================
// Validando os dados de entrada com o Zod
// ============================================================================

export const CreateOccurrenceSchema = z.object ({
    // O ID da ocorrência. Gerado automaticamente se não for enviado
	uuid: z.string().uuid({ message: "Formato de ID inválido" }).default(() => crypto.randomUUID()),
	// Validamos se o ID do veículo roubado foi enviado
	vehicleId: z.string().uuid({ message: "O ID do veículo é obrigatório" }),
	// O "z.enum()" gera uma lista fechada de opções para o usuário escolher uma opção na lista
	status: z.enum(["Roubado", "Furtado", "Recuperado"]).refine(() => true, {
        message: "O status deve ser obrigatoriamente: 'Roubado', 'Furtado' ou 'Recuperado'"
    }),
	// Força a conversão do dado recebido em um objeto de data real
	dateOccurrence: z.coerce.date({ message: "Data da ocorrência inválida" }),
	// O número do BO deve ter no mínio 3 caracteres
	boNumber: z.string().min(3, { message: "Número do B.O é obrigatório" }),
	// A descrição deve ter no mínimo 5 caracteres
	description: z.string().min(5, { message: "A descrição do fato precisa ter pelo menos 5 caracteres" })
});

// Regras para quando o usuário quiser atualizar apenas algumas informações da ocorrência
export const UpdateOccurrenceSchema = CreateOccurrenceSchema.partial().omit({ uuid: true });

// Extraindo o "Tipo" para o TypeScript entender o formato internamente
export type OccurrenceInput = z.infer<typeof CreateOccurrenceSchema>;

// ============================================================================
// Definindo a tabela do banco de dados com typeORM
// ============================================================================

// Avisando ao PostgreSQL para criar uma tabela chamada 'occurrences'
@Entity("occurrences")
export class Occurrence {
    
    // Chave Primária (ID)
    @PrimaryColumn() 
    uuid!: string;
    
    // Coluna de Texto Simples para o ID do veículo
    @Column({ name: "vehicle_id" })
    vehicleId!: string;
    
    // Muitas ocorrências podem pertencer a um mesmo veículo (se ele for roubado mais de uma vez, por exemplo)
    @ManyToOne(() => Vehicle)
    @JoinColumn({ name: "vehicle_id" })
    vehicle!: Vehicle;
    
    @Column()
    status!: string;
    
    // Para nomes compostos de colunas no banco de dados, é uma boa prática usar o "underline" (snake_case)
    @Column({ name: "date_occurrence" })
    dateOccurrence!: Date;
    
    @Column({ name: "bo_number" })
    boNumber!: string;
    
    @Column()
    description!: string;
    
    // Assim que um registro de ocorrência nasce no código, ele ganha um ID único
    constructor() {
	    crypto.randomUUID();
    }
}