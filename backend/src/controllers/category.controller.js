import * as service from '../services/category.service.js';

export async function getAll(req, res) {
  const categories = await service.getAllCategories();

  res.json(categories);
}

export async function getById(req, res) {
  const category = await service.getCategoryById(
    Number(req.params.id)
  );

  res.json(category);
}

export async function create(req, res) {
  const id = await service.create(req.body);

  res.status(201).json({
    id
  });
}

export async function update(req, res) {
  await service.update(
    Number(req.params.id),
    req.body
  );

  res.json({
    updated: true
  });
}

export async function remove(req, res) {
  await service.remove(
    Number(req.params.id)
  );

  res.status(204).send();
}