# lojas-latinas

## O que é este projeto

As Lojas Latinas são um site de e-commerce de grande porte, com foco em experiência do cliente e recomendação personalizada de produtos, baseada em ferramentas de inteligência artificial.

Este laboratório foi gerado pelo **Dev Lab Generator** para servir como base didática de desenvolvimento full stack com CRUD.

## Stack escolhida

- Banco: **MySQL + phpMyAdmin**
- Backend: **Node.js / Express**
- Frontend: **Next SPA**

## Estrutura funcional

As entidades de exemplo são:
- `categories`
- `products`

As rotas REST esperadas no backend são:
- `GET /api/categories`
- `GET /api/categories/{id}`
- `POST /api/categories`
- `PUT /api/categories/{id}`
- `DELETE /api/categories/{id}`
- `GET /api/products`
- `GET /api/products/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`

## Portas e acessos

- Backend REST: http://localhost:8000
- Frontend: http://localhost:3000
- Banco (mysql): localhost:3306
- Administração do banco: http://localhost:8080

## Credenciais iniciais

- MySQL root: root / admin
- MySQL app: labuser / admin
- Database: labdb


## Onde alterar

- Banco e dados iniciais: `database/init/01-schema.sql`
- Backend Node: `backend/src/server.js`
- Frontend Next SPA: `frontend/pages/` e `frontend/lib/`
- Infra e portas: `docker-compose.yml` e `.env`

## Healthchecks

- Banco: usa healthcheck nativo do container do banco.
- Backend: só fica `healthy` se responder HTTP e conseguir consultar o banco.
- Frontend: só fica `healthy` se subir localmente e conseguir acessar o health do backend.

## Como subir

```bash
docker compose up --build
```

## Arquivos importantes

- `docker-compose.yml`: orquestração principal
- `.env`: variáveis ativas do ambiente
- `.env.example`: cópia de referência das variáveis
- `database/init/01-schema.sql`: criação das tabelas e carga inicial
- `backend/`: API escolhida
- `frontend/`: interface escolhida

## Resumo de configuração

- O backend recebe `DB_CLIENT` para adaptar a conexão entre MySQL e Oracle.
- Os drivers do banco correspondente são instalados no backend gerado.
- Os dados e scripts são gravados em UTF-8.
- Para MySQL, o servidor sobe com `utf8mb4` e `utf8mb4_unicode_ci`.
- Quando o backend for `nenhum`, o frontend é gerado desacoplado da API.
- Quando o frontend for `nenhum`, o laboratório fica orientado a backend e banco.
