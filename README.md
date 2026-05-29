# HelpHome API

API REST para gerenciamento de chamados de manutenção predial.

O sistema permite que usuários abram chamados para problemas relacionados à manutenção, como elétrica, hidráulica, internet, limpeza e suporte geral. Técnicos podem assumir chamados e atualizar seus status, enquanto administradores possuem controle total sobre usuários e atendimentos.

---

# Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* JWT
* Swagger
* BcryptJS

---

# Funcionalidades

## Usuários

* Criar usuários
* Ativar usuário
* Desativar usuário
* Excluir usuário
* Controle de permissões por perfil

### Perfis disponíveis

* `ADMIN`
* `TECHNICIAN`
* `REQUESTER`

---

## Chamados

* Criar chamados
* Listar chamados
* Buscar chamado por ID
* Atualizar status
* Atribuir técnico
* Controle de visualização por perfil

---

# Instalação

## Clonar o projeto

```bash
git clone <url-do-repositorio>
```

## Entrar na pasta

```bash
cd nome-do-projeto
```

## Instalar dependências

```bash
npm install
```

---

# Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/helphome"

JWT_SECRET="secret"
PORT=3000
```

---

# Banco de dados

## Gerar client do Prisma

```bash
npm run prisma:generate
```

## Executar migrations

```bash
npm run prisma:migrate
```

---

# Seed do banco

O projeto possui um seed com usuários, chamados e comentários para testes.

## Executar seed

```bash
npm run prisma:seed
```

---

# Usuários para teste

Todos os usuários possuem a senha:

```txt
123456
```

## ADMIN

```txt
Email: admin@helphome.com
Senha: 123456
```

## TECHNICIAN

```txt
Email: carlos@helphome.com
Senha: 123456
```

## REQUESTER

```txt
Email: joao@helphome.com
Senha: 123456
```

---

# Executando o projeto

## Ambiente de desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Executar build

```bash
npm start
```

---

# Prisma Studio

Interface visual para visualizar o banco de dados:

```bash
npm run prisma:studio
```

---

# Documentação Swagger

Após iniciar a aplicação, acesse:

```txt
http://localhost:3000/docs
```

---

# Autenticação

A API utiliza autenticação JWT.

Para acessar rotas protegidas, envie o token no header:

```txt
Authorization: Bearer TOKEN
```

---

# Status dos chamados

* `NEW`
* `IN_PROGRESS`
* `PENDING`
* `CLOSED`

---

# Prioridades

* `LOW`
* `MEDIUM`
* `HIGH`

---

# Autor

Pedro Paulo Borges Mizael
