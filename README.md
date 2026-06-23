# Lojas Latinas

## O que é este projeto

As Lojas Latinas são um site de e-commerce de grande porte, com foco em experiência do cliente e recomendação personalizada de produtos, baseada em ferramentas de inteligência artificial.

Este laboratório foi gerado pelo **Dev Lab Generator** e expandido manualmente para servir como base didática de desenvolvimento full stack com arquitetura limpa (Use Cases, Repositories, Controllers) e CRUD complexo.

## Stack escolhida

- Banco: **MySQL + phpMyAdmin** (Codificação `utf8mb4_unicode_ci`)
- Backend: **Node.js / Express** (Camada de segurança com `bcrypt`)
- Frontend: **Next.js SPA + Bootstrap / Bootstrap Icons**

## Segurança Implementada 🔒

- **SQL Injection Protection:** Queries parametrizadas com *Prepared Statements* em todas as interações com o banco de dados.
- **Password Hashing:** Armazenamento seguro de senhas utilizando criptografia de via única via **Bcrypt** com 10 salt rounds. O banco de dados não armazena nenhuma senha em texto limpo.

## Estrutura funcional

As rotas REST ativas e esperadas no backend são:

### Categorias e Produtos
- `GET /api/categories` | `GET /api/categories/{id}`
- `POST /api/categories` | `PUT /api/categories/{id}` | `DELETE /api/categories/{id}`
- `GET /api/products` | `GET /api/products/{id}`
- `POST /api/products` | `PUT /api/products/{id}` | `DELETE /api/products/{id}`

### Usuários e Autenticação
- `POST /api/users` *(Cadastro de usuário com hash de senha)*
- `POST /api/auth/login` *(Validação de credenciais via Bcrypt)*

### Carrinho de Compras (Items Cart)
- `GET /api/cart_items/user/{userId}` *(Lista itens do carrinho do usuário)*
- `POST /api/cart_items` *(Adiciona produto ou incrementa quantidade se já existente)*
- `PUT /api/cart_items/{id}` *(Altera a quantidade de um item específico direto na página do carrinho)*
- `DELETE /api/cart_items/{id}` *(Remove o item por completo ou quando a quantidade chega a zero)*

### Pedidos (Orders)
- `POST /api/orders` *(Gera um novo pedido fechando o carrinho atual)*
- `GET /api/orders/user/{userId}` *(Histórico de pedidos do usuário)*

## Portas e acessos

- Backend REST: http://localhost:8000
- Frontend: http://localhost:3000
- Banco (mysql): localhost:3306
- Administração do banco (phpMyAdmin): http://localhost:8080

## Credenciais iniciais (Carga de Testes)

Os usuários abaixo vêm pré-populados no banco com senhas em formato Hash:
- **Administrador:** `vitoralmeidaprado@gmail.com` / Senha: `Vitor`
- **Usuário Teste 01:** `user01@gmail.com` / Senha: `Senha123`
- **Usuário Teste 02:** `joao123@gmail.com` / Senha: `Joao123`

*Credenciais de Infra:*
- MySQL root: root / admin
- MySQL app: labuser / admin
- Database: labdb

## Onde alterar

- Banco e dados iniciais: `database/init/01-schema.sql` (Contém 10 categorias e 50 produtos populados)
- Backend Node: `backend/src/` (Organizado em Camadas: `domain`, `usecases`, `repositories`, `controllers`)
- Frontend Next SPA: `frontend/pages/` e `frontend/lib/`
- Infra e portas: `docker-compose.yml` e `.env`

## Healthchecks

- Banco: usa healthcheck nativo do container do banco.
- Backend: só fica `healthy` se responder HTTP e conseguir consultar o banco.
- Frontend: só fica `healthy` se subir localmente e conseguir acessar o health do backend.

## Como subir e resetar o ambiente

Para subir o sistema normalmente:
```bash
docker compose up -d --build