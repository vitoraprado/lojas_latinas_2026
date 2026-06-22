import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { CartItem } from '../domain/CartItem.js';

export class CreateCartItemUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['user_id', 'product_id', 'quantity']);

    const currentItems = await this.cartItemRepository.findByUserId(payload.user_id);
    const existingItem = currentItems.find(item => {
      const prodId = item.product_id || item.product?.id;
      return Number(prodId) === Number(payload.product_id);
    });

    if (existingItem) {
      const newQuantity = Number(existingItem.quantity) + Number(payload.quantity);
      
      const itemId = existingItem.id;

      if (!itemId) {
        throw new Error('Não foi possível mapear o ID do item do carrinho existente.');
      }

      await this.cartItemRepository.update(
        itemId,
        payload.user_id,
        payload.product_id,
        newQuantity
      );
      
      return itemId;
    }

    const cartItem = new CartItem({
      user_id: payload.user_id,
      product_id: payload.product_id,
      quantity: payload.quantity
    });

    return this.cartItemRepository.create(cartItem);
  }
}