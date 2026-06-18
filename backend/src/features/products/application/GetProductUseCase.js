import { AppError } from '../../../shared/errors/AppError.js';

export class GetProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    return product;
  }
}