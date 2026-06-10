import * as service from '../services/product.service.js';

export async function getAll(req, res) {
  const prodcuts = await service.getAllProducts();

  res.json(prodcuts);
}

export async function getById(req, res) {
  const product = await service.getProductById(
    Number(req.params.id)
  );

  res.json(product);
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