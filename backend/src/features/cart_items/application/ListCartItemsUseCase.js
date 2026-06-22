export class ListCartItemsUseCase {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error("O ID do usuário é obrigatório para listar o carrinho.");
    }

    return this.cartItemRepository.findByUserId(userId);
  }
}