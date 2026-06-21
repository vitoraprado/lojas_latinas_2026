import { requiredFields } from '../../../shared/validators/requiredFields.js';
import { Order } from '../domain/Order.js';

export class CreateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(payload) {
    requiredFields(payload, ['user_id', 'product_id', 'status']);

    const order = new Order({
      user_id: payload.user_id,
      order_date: payload.product_id,
      status: payload.status
    });

    return this.orderRepository.create(order);
  }
}