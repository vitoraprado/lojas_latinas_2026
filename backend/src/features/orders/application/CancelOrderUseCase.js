import { AppError } from '../../../shared/errors/AppError.js';

export class CancelOrderUseCase {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute(orderId) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    if (order.status === 4) { // 4 - Cancelado
      throw new AppError('Este pedido já está cancelado', 400);
    }
    if (order.status === 3) { // 3 - Entregue
      throw new AppError('Não é possível cancelar um pedido que já foi entregue', 400);
    }

    const orderItems = await this.orderRepository.findItemsByOrderId(orderId);

    for (const item of orderItems) {
      await this.productRepository.incrementStock(item.product_id, item.quantity);
    }

    await this.orderRepository.changeStatus(orderId, 4); // 4 - Cancelado
    return true;
  }
}