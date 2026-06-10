import * as repository from '../repositories/product.repository.js';

export async function getAllProducts() {
  return repository.findAll();
}

export async function getProductById(id) {
  const product = await repository.findById(id);

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  return product;
}

export async function create(data) {
  if (!data.name?.trim()) {
    throw new Error('Nome é obrigatório');
  }

  if (!data.category_id || data.category_id <= 0) {
    throw new Error('Categoria inválida');
  }

  if (data.price < 0) {
    throw new Error('Preço inválido');
  }

  if (data.stock < 0) {
    throw new Error('Estoque inválido');
  }

  return repository.create(
    data.name.trim(),
    data.category_id,
    data.price,
    data.stock
  );
}

export async function update(id, data) {
  if (!data.name?.trim()) {
    throw new Error('Nome é obrigatório');
  }

  if (!data.category_id || data.category_id <= 0) {
    throw new Error('Categoria inválida');
  }

  if (data.price < 0) {
    throw new Error('Preço inválido');
  }

  if (data.stock < 0) {
    throw new Error('Estoque inválido');
  }

  return repository.update(id, 
    data.name.trim(),
    data.category_id,
    data.price,
    data.stock);
}

export async function remove(id) {
  await repository.remove(id);
}