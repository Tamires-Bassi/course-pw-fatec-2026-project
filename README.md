# API de Gestão de Veiculos Roubados/Furtados - Fatec

Projeto desenvolvido como método de avaliação para a P2 da disciplina de Programação Web da Fatec. Trata-se de uma RESTful API construída com Node.js e TypeScript para o gerenciamento de usuários, registro de veiculos e controle de ocorrencias (roubos, furtos e recuperações).

## Requisitos do Projeto Atendidos

Este projeto contempla todos os requisitos obrigatórios e extras solicitados na avaliação:
- Utilização de biblioteca ORM (TypeORM).
- Autenticação de usuários via JWT.
- Documentação de rotas e testes End-to-End (E2E) via APIdog.
- Testes unitários utilizando validação de Schemas.
- Containerização da aplicação com Dockerfile.
- Deploy em ambiente de nuvem utilizando a plataforma Render.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript / Node.js
- **Framework Web:** Express.js
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM
- **Validacao de Dados:** Zod
- **Seguranca:** JSON Web Token (JWT) e Autenticação Criptografada
- **Infraestrutura:** Docker e Render

## Estrutura da API (Endpoints)

A API possui um prefixo global `/api/v1` e esta dividida nos seguintes modulos:

### Autenticação
- `POST /api/v1/auth/login`: Realiza o login do usuário e retorna o Token JWT.

### Usuarios
- `GET /api/v1/users`: Retorna todos os usuários cadastrados.
- `GET /api/v1/users/:uuid`: Busca um usuário especifico pelo ID.
- `GET /api/v1/users/username/:username`: Busca um usuário pelo nome de acesso.
- `POST /api/v1/users`: Cria um novo usuário.
- `PUT  /api/v1/users/:uuid`: Atualiza dados de um usuário.
- `DELETE /api/v1/users/:uuid`: Remove um usuário do sistema.

### Veículos
- `GET /api/v1/vehicles`: Retorna todos os veículos.
- `GET /api/v1/vehicles/:uuid`: Busca um veículo pelo ID.
- `GET /api/v1/vehicles/placa/:placa`: Busca um veículo pela placa.
- `POST /api/v1/vehicles`: Cadastra um novo veículo (vinculado a um usuário).
- `PUT / PATCH /api/v1/vehicles/:uuid`: Atualiza os dados do veículo.
- `DELETE /api/v1/vehicles/:uuid`: Deleta um veículo.

### Ocorrências
- `GET /api/v1/occurrences`: Retorna todas as ocorrências de roubo/furto cadastradas.
- `GET /api/v1/occurrences/:uuid`: Retorna uma ocorrência específica.
- `POST /api/v1/occurrences`: Registra uma nova ocorrência vinculada a um veículo.
- `PUT / PATCH /api/v1/occurrences/:uuid`: Atualiza os dados ou o status da ocorrência.
- `DELETE /api/v1/occurrences/:uuid`: Remove o registro da ocorrência.

### Sistema
- `GET /status`: Rota de Health Check para verificar se a API esta online na nuvem.

## Como rodar o projeto localmente

1. **Clone o repositório:** Digite no seu terminal o comando `git clone https://github.com/Tamires-Bassi/course-pw-fatec-2026-project.git` e depois acesse a pasta criada com o comando `cd course-pw-fatec-2026-project`
2. **Instale as dependências:** Digite no terminal o comando `npm install`
3. **Configure as Variáveis de Ambiente:** Crie um arquivo chamado `.env` na raiz do projeto contendo as chaves de configuração do seu banco de dados (como DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_NAME) e as chaves da API (PORT=3000, JWT_SECRET, DEFAULT_USERNAME e DEFAULT_USERPASS).
4. **Inicie o servidor:** Digite no terminal o comando `npm run dev` e a aplicação estara rodando em http://localhost:3000.

## Como rodar com Docker

Como o projeto possui um Dockerfile configurado, você pode subir toda a aplicação usando apenas dois comandos no terminal:
1. Primeiro, digite `docker build -t api-veiculos .` para construir a imagem.
2. Depois, digite `docker run -p 3000:3000 api-veiculos` para iniciar o conteiner.

## Status do Deploy

O deploy da aplicaçãoo foi realizado atraves da plataforma Render.
A rota de Health Check pública pode ser acessada adicionando `/status` na URL base da API hospedada.
