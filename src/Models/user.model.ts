import { Entity, PrimaryColumn, Column } from "typeorm"; // Importando as etiquetas necessárias do TypeORM
import { z } from "zod"; // Importando o Zod para criar as regras de validação
import crypto from "crypto"; // Pacote nativo de segurança do Node para gerar um ID único

// ============================================================================
// Validando os dados de entrada com o Zod
// ============================================================================

// Criando um esquema para quando alguém tentar criar um usuário
export const CreateUserSchema = z.object ({
    // Caso o usuário não forneça um ID, o sistema irá gerar um automaticamente usando uuidv4
    uuid: z.string().uuid({ message: "Formato de ID inválido" }).default(() => crypto.randomUUID()),
    // Usando o ".min(3)" para farantir que ninguém crie um usuário com nome muito curto
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    // Usando "length()" para garantir que ninguém crie um CPF muito curto ou muito longo
    cpf: z.string().length(11, { message: "O CPF deve ter exatamente 11 dígitos" }), // Usamos string em vez de número para não perdermos os zeros à esquerda
    // O contato também é texto, com no mínimo 8 números
    contact: z.string().min(8, { message: "Número de contato inválido" }),
    // A senha precisa ter pelo menos 6 caracteres por segurança
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

// Para que o usuário possa atualizar seus dados
// O ".partial()" pega todas as regras acima e torna os campos opcionais. Assim, o usuário pode atualizar apenas o que quiser, sem precisar preencher tudo de novo.
// O ".omit({ uuid: true })" não permite que o usuário atualize o ID, pois ele é fixo e não deve ser alterado
export const UpdateUserSchema = CreateUserSchema.partial().omit({ uuid: true });

// Extraindo as propriedades do Zod para o código saber internamente que um UserInput sempre terá nome, cpf, contato, etc
export type UserInput = z.infer<typeof CreateUserSchema>;

// ============================================================================
// Definindo a tabela do banco de dados com typeORM
// ============================================================================

// A etiqueta @Entity() avisa o banco de dados (PostgreSQL) que essa classe representa uma tabela chamada "users"
@Entity("users")
export class User{
    // A etiqueta @PrimaryColumn() define a chave primaria da tabela
    @PrimaryColumn()
    uuid!: string;

    // A etiqueta @Column() define as outras colunas da tabela
    // A exclamação (!) diz ao TypeScript que esses campos são obrigatórios e sempre terão um valor, mesmo que não sejam inicializados no construtor
    @Column()
    name!: string;

    @Column()
    cpf!: string;

    @Column()
    contact!: string;

    @Column()
    password!: string;
    
    // O constructor é uma função especial que é chamada quando criamos um novo usuário. Ele inicializa o campo "uuid" com um valor gerado automaticamente
    constructor() {
        crypto.randomUUID();
    }
}