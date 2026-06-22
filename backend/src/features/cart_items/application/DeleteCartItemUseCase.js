import { AppError } from '../../../shared/errors/AppError.js';

export class DeleteCartItemUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(id) {
    const exists = await this.cartItemRepository.findById(id);

    if (!exists) {
      throw new AppError('Item do carrinho não encontrado', 404);
    }

    await this.cartItemRepository.delete(id);
    return true;
  }
}