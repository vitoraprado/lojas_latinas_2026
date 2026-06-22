import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { AppError } from '../../../shared/errors/AppError.js';

export class UpdateCartItemUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(id, payload) {
    requiredFields(payload, ['quantity']);

    const exists = await this.cartItemRepository.findById(id);

    if (!exists) {
      throw new AppError('Item do carrinho não encontrado', 404);
    }

    return this.cartItemRepository.update(id, payload.user_id, payload.product_id, payload.quantity);
  }
}