import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"; // Importando as etiquetas ManyToOne e JoinColumn para criar a relação entre as tabelas
import { z } from "zod";
import crypto from "crypto"; // Pacote nativo de segurança do Node para gerar um ID único
import { User } from "./user.model";  // Importando o modelo de usuário para criar a relação entre as tabelas

// ============================================================================
// Validando os dados de entrada com o Zod
// ============================================================================

// Definindo as regras para cadastrar um veículo
export const CreateVehicleSchema = z.object({
    // O ID do veículo. Gerado automaticamente se não for enviado
    uuid: z.string().uuid({ message: "Formato de ID inválido" }).default(() => crypto.randomUUID()),
    // ID do usuário que está cadastrando o veículo
    ownerId: z.string().uuid({ message: "O ID do proprietário é obrigatório e deve ser válido" }),
    // A plava do veículo precisa ter 7 caracteres
    licensePlate: z.string().length(7, { message: "A placa deve ter exatamente 7 caracteres" }),
    // O Renavam deve ter exatamente 11 dígitos
    renavam: z.string().length(11, { message: "O Renavam deve ter exatamente 11 dígitos" }),
    // O modelo di carro deve ter no mínimo 2 caracteres
    model: z.string().min(2, { message: "O modelo deve ter pelo menos 2 caracteres" }),
    // Apenas aceita a silga do estado, que tem 2 caracteres
    state: z.string().length(2, { message: "Use a sigla do estado com 2 letras (ex: SP)" }),
    // O nome da cidade deve ter no mínimo 2 caracteres
    city: z.string().min(2, { message: "A cidade deve ter pelo menos 2 caracteres" })
});

// Regras para quando o usuário quiser atualizar apenas algumas informações do veículo
export const UpdateVehicleSchema =  CreateVehicleSchema.partial().omit({ uuid: true });

// Extraindo o "Tipo" para o TypeScript entender o formato internamente
export type VehicleInput = z.infer<typeof CreateVehicleSchema>;

// ============================================================================
// Definindo a tabela do banco de dados com typeORM
// ============================================================================

// Avisando ao PostgreSQL para criar uma tabela chamada 'vehicles'
@Entity("vehicles")
export class Vehicle {
    // O ID do veículo é a PK da tabela
    @PrimaryColumn()
    uuid!: string;

    // Coluna de Texto Simples que facilita a criação do veículo enviando só o texto do ID do dono
    @Column({ name: "owner_id" })
    ownerId!: string;

    // Criando a relação entre as tabelas vehicles e users
    @ManyToOne(() => User) // O "ManyToOne" diz que o relacionamente é de N:1 (1 usuário pode ter N veículos)
    // Salvando o ID do dono como { name: "owner_id" }, pois é uma boa prática em bancos de dados
    @JoinColumn({ name: "owner_id" }) // O "JoinColumn" diz que essa coluna é a FK que liga as tabelas
    owner!: User;  // O TypeScript agora sabe que o dono não é só um texto, mas um Usuário válido

    @Column()
    licensePlate!: string;

    @Column()
    renavam!: string;

    @Column()
    model!: string;

    @Column()
    state!: string;

    @Column()
    city!: string;

    // Assim que um registro de veículo nasce no código, ele ganha um ID único.
    constructor() {
        crypto.randomUUID();
    }
}