import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { AppError } from '../../../shared/errors/AppError.js';

export class UpdateCartItemUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(id, payload) {
    requiredFields(payload, ['name']);

    const exists = await this.cartItemRepository.findById(id);

    if (!exists) {
      throw new AppError('Item do carrinho não encontrado', 404);
    }

    return this.cartItemRepository.update(id, payload);
  }
}