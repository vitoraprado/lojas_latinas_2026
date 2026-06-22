SET NAMES utf8mb4;
ALTER DATABASE labdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  user_type INT NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS items_cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_items_cart_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_cart_product
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status INT NOT NULL,
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS items_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_items_order_order
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_order_product
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO categories (id, name, description) VALUES
(1, 'Eletrônicos', 'Smartphones, mouses, teclados e acessórios tecnológicos'),
(2, 'Livros', 'Livros físicos e e-books de ficção, técnicos e biografias'),
(3, 'Roupas', 'Vestuário masculino, feminino e calçados'),
(4, 'Alimentos', 'Itens alimentícios, snacks e mercearia em geral'),
(5, 'Eletrodomésticos', 'Eletrodomésticos de grande e pequeno porte para a casa'),
(6, 'Jogos e Consoles', 'Videogames, jogos físicos, digitais e controles periféricos'),
(7, 'Casa e Decoração', 'Móveis, luminárias, tapetes e objetos decorativos'),
(8, 'Esportes e Lazer', 'Equipamentos esportivos, suplementos e vestuário fitness'),
(9, 'Beleza e Saúde', 'Cosméticos, perfumes, maquiagens e cuidados pessoais'),
(10, 'Papelaria', 'Cadernos, canetas, agendas e materiais de escritório')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

INSERT INTO products (id, category_id, name, price, stock) VALUES
-- Eletrônicos (Cat 1)
(1, 1, 'Mouse Wireless Pro', 129.90, 25),
(2, 1, 'Teclado Mecânico RGB', 349.90, 15),
(3, 1, 'Monitor 24 IPS 144Hz', 899.00, 8),
(4, 1, 'Headset Gamer 7.1', 199.90, 30),
(5, 1, 'Carregador Rápido USB-C', 49.90, 100),
-- Livros (Cat 2)
(6, 2, 'Algoritmos em Prática', 89.90, 40),
(7, 2, 'Quinze Dias', 39.90, 85),
(8, 2, 'Clean Code: Código Limpo', 110.00, 15),
(9, 2, 'O Programador Pragmático', 95.00, 20),
(10, 2, 'Introdução ao SQL', 59.90, 35),
-- Roupas (Cat 3)
(11, 3, 'Camiseta Básica Preta', 39.90, 120),
(12, 3, 'Calça Jeans Slim', 119.90, 45),
(13, 3, 'Moletom com Capuz', 149.90, 25),
(14, 3, 'Tênis Casual Branco', 189.90, 18),
(15, 3, 'Meias Cano Alto (Par)', 14.90, 200),
-- Alimentos (Cat 4)
(16, 4, 'Chocolate ao Leite Barra 145g', 15.00, 90),
(17, 4, 'Café Espresso Gourmet 250g', 24.90, 60),
(18, 4, 'Barra de Cereal Nutry (Caixa)', 18.00, 75),
(19, 4, 'Batata Chips Clássica 100g', 8.50, 110),
(20, 4, 'Energético Monster 473ml', 9.90, 150),
-- Eletrodomésticos (Cat 5)
(21, 5, 'Fritadeira Elétrica Airfryer', 389.90, 12),
(22, 5, 'Liquidificador 1200W', 149.90, 22),
(23, 5, 'Cafeteira Elétrica Inox', 129.90, 14),
(24, 5, 'Micro-ondas 30L Digital', 549.00, 6),
(25, 5, 'Aspirador de Pó Vertical', 179.90, 19),
-- Jogos e Consoles (Cat 6)
(26, 6, 'Controle Sem Fio PS5', 399.90, 10),
(27, 6, 'Jogo RPG Clássico Remake', 249.90, 30),
(28, 6, 'Console Retro Portátil', 299.00, 15),
(29, 6, 'Card Game de Estratégia', 59.90, 50),
(30, 6, 'Mousepad Speed Extra Grande', 79.90, 65),
-- Casa e Decoração (Cat 7)
(31, 7, 'Luminária de Mesa Articulada', 69.90, 40),
(32, 7, 'Almofada Decorativa Geométrica', 34.90, 80),
(33, 7, 'Quadro Decorativo Minimalista', 45.00, 25),
(34, 7, 'Cadeira de Escritório Ergonômica', 499.00, 7),
(35, 7, 'Organizador de Fios de Mesa', 19.90, 140),
-- Esportes e Lazer (Cat 8)
(36, 8, 'Garrafa Térmica Inox 750ml', 89.90, 55),
(37, 8, 'Corda de Pular Ajustável', 29.90, 90),
(38, 8, 'Tapete de Yoga em EVA', 59.90, 35),
(39, 8, 'Whey Protein Isolado 900g', 139.90, 28),
(40, 8, 'Kit Mini Bands (3 Intensidades)', 39.90, 70),
-- Beleza e Saúde (Cat 9)
(41, 9, 'Protetor Solar Facial FPS 60', 59.90, 48),
(42, 9, 'Hidratante Corporal Cerave', 84.90, 32),
(43, 9, 'Perfume Masculino Colônia', 120.00, 14),
(44, 9, 'Sabonete Líquido Facial 150ml', 34.90, 60),
(45, 9, 'Kit Pincéis de Maquiagem', 49.90, 42),
-- Papelaria (Cat 10)
(46, 10, 'Caderno Universitário 10 Matérias', 29.90, 85),
(47, 10, 'Caneta Gel Preta (Caixa c/ 12)', 24.00, 110),
(48, 10, 'Planner Semanal de Mesa', 19.90, 95),
(49, 10, 'Marca Texto Neon (Kit c/ 5)', 15.90, 130),
(50, 10, 'Mochila Impermeável Preta', 159.90, 20)
ON DUPLICATE KEY UPDATE category_id=VALUES(category_id), name=VALUES(name), price=VALUES(price), stock=VALUES(stock);

INSERT INTO users (id, name, user_type, email, password) VALUES
(1, 'Vítor Almeida Prado', 1, 'vitoralmeidaprado@gmail.com', 'Vitor'),
(2, 'Usuário Teste', 2, 'user01@gmail.com', 'Senha123'),
(3, 'João Silva', 2, 'joao123@gmail.com', 'Joao123')
ON DUPLICATE KEY UPDATE name=VALUES(name), user_type=VALUES(user_type), email=VALUES(email), password=VALUES(password);

INSERT INTO items_cart (id, user_id, product_id, quantity) VALUES
(1, 1, 3, 1),
(2, 1, 8, 2),
(3, 2, 11, 3),
(4, 2, 16, 2),
(5, 2, 20, 4),
(6, 3, 1, 1),
(7, 3, 46, 2)
ON DUPLICATE KEY UPDATE user_id=VALUES(user_id), product_id=VALUES(product_id), quantity=VALUES(quantity);

INSERT INTO orders (id, user_id, order_date, status) VALUES

(1, 1, '2026-06-10 14:22:00', 3), 
(2, 2, '2026-06-19 09:15:30', 2),
(3, 3, '2026-06-21 23:52:15', 2),
(4, 3, '2026-06-22 01:49:59', 3)
ON DUPLICATE KEY UPDATE user_id=VALUES(user_id), order_date=VALUES(order_date), status=VALUES(status);

INSERT INTO items_order (id, order_id, product_id, quantity) VALUES
(1, 1, 2, 1),
(2, 1, 6, 1),
(3, 2, 21, 1),
(4, 3, 1, 1),
(5, 3, 2, 1),
(6, 3, 3, 1),
(7, 4, 1, 2)
ON DUPLICATE KEY UPDATE order_id=VALUES(order_id), product_id=VALUES(product_id), quantity=VALUES(quantity);