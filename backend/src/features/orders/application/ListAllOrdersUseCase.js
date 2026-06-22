export class ListAllOrdersUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(userId) {
    return this.orderRepository.listAll();
  }
}