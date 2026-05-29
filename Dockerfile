# Escolhe um computador virtual que já vem com o Node.js instalado (versão 20, versão leve 'alpine')
FROM node:20-alpine

# Cria uma pasta chamada /app lá dentro e diz que vamos trabalhar nela
WORKDIR /app

# Copia os arquivos de configuração do Node (package.json e package-lock.json) para dentro da pasta /app
COPY package*.json ./

# Roda o comando para instalar todas as bibliotecas (Express, TypeORM, Zod, etc.)
RUN npm install

# Copia todo o resto do código do seu projeto (a pasta src, o .env, etc.) para lá
COPY . .

# Avisa ao Docker que a nossa API vai usar a porta 3000 para se comunicar com o mundo externo
EXPOSE 3000

# O comando final que liga o servidor (o mesmo que usamos no terminal)
CMD ["npm", "run", "dev"]
