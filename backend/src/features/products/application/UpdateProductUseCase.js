import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { AppError } from '../../../shared/errors/AppError.js';

export class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, payload) {
    requiredFields(payload, ['name']);

    const exists = await this.productRepository.findById(id);

    if (!exists) {
      throw new AppError('Produto não encontrado', 404);
    }

    return this.productRepository.update(id, payload);
  }
}