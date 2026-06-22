import { AppError } from '../../../shared/errors/AppError.js';

export class ChangeOrderStatusUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id, status) {
    const exists = await this.orderRepository.findById(id);

    if (!exists) {
      throw new AppError('Pedido não encontrado', 404);
    }

    await this.orderRepository.changeStatus(id, status);
    return true;
  }
}