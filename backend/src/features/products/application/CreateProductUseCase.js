import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { Product } from '../domain/Product.js';

export class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['name']);

    const product = new Product({
      category_id: payload.category_id,
      name: payload.name,
      stock: payload.stock,
      price: payload.price,
    });

    return this.productRepository.create(product);
  }
}