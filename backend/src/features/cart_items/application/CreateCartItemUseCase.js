import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { CartItem } from '../domain/CartItem.js';

export class CreateCartItemUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['user_id', 'product_id', 'quantity']);

    const cartItem = new CartItem({
      user_id: payload.user_id,
      product_id: payload.product_id,
      quantity: payload.quantity
    });

    return this.cartItemRepository.create(cartItem);
  }
}