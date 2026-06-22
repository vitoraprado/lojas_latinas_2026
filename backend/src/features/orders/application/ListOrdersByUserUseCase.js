export class ListOrdersByUserUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error("O ID do usuário é obrigatório para listar os pedidos.");
    }

    return this.orderRepository.findByUserId(userId);
  }
}