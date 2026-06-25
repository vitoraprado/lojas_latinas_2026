import { AppError } from '../../../shared/errors/AppError.js';

export class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const exists = await this.productRepository.findById(id);

    if (!exists) {
      throw new AppError('Produto não encontrado', 404);
    }

    await this.productRepository.remove(id);
    return true;
  }
}