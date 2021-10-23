FROM node:14-alpine
ADD ./db/init.sql /docker-entrypoint-initdb.d/

# Diretorio da aplicação dentro do container
WORKDIR /usr/app

# Copiando o package json e yarn lock para poder instalar as dependencias
COPY package.json ./
COPY yarn.lock ./

# Executando a instalação dos pacotes
RUN yarn install

# Executando a instalação do query builder
RUN yarn global add knex

# Copiando o restante dos arquivos
COPY . .
