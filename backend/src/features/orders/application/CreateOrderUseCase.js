import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { Order } from '../domain/Order.js';

export class CreateOrderUseCase {
  constructor(orderRepository, cartItemRepository) {
    this.orderRepository = orderRepository;
    this.cartItemRepository = cartItemRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['user_id', 'status']);

    const { user_id, status, order_date } = payload;

    const cartItems = await this.cartItemRepository.findByUserId(user_id);

    if (!cartItems || cartItems.length === 0) {
      throw new Error('Não é possível fechar um pedido com o carrinho vazio.');
    }

    const order = new Order({
      user_id,
      status
    });

    const orderId = await this.orderRepository.create(order);

    for (const item of cartItems) {
      await this.orderRepository.createItem({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });

      await this.cartItemRepository.delete(item.id);
    }

    return {
      order_id: orderId,
      message: 'Pedido gerado e carrinho limpo com sucesso!'
    };
  }
}