import * as repository from '../repositories/category.repository.js';

export async function getAllCategories() {
  return repository.findAll();
}

export async function getCategoryById(id) {
  const category = await repository.findById(id);

  if (!category) {
    throw new Error('Categoria não encontrada');
  }

  return category;
}

export async function create(data) {
  if (!data.name?.trim()) {
    throw new Error('Nome é obrigatório');
  }

  return repository.create(
    data.name,
    data.description || null
  );
}

export async function update(id, data) {
  if (!data.name?.trim()) {
    throw new Error('Nome é obrigatório');
  }

  await repository.update(
    id,
    data.name,
    data.description || null
  );
}

export async function remove(id) {
  await repository.remove(id);
}