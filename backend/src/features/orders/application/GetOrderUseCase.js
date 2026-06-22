import { AppError } from '../../../shared/errors/AppError.js';

export class GetOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    const items = await this.orderRepository.findItemsByOrderId(orderId);

    return {
      ...order,
      items: items
    };
  }
}