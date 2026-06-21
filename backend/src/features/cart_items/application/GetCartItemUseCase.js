import { AppError } from '../../../shared/errors/AppError.js';

export class GetCartItemUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(id) {
    const cartItem = await this.cartItemRepository.findById(id);

    if (!cartItem) {
      throw new AppError('Item do carrinho não encontrado', 404);
    }

    return cartItem;
  }
}