import { sendResponse } from '../../../shared/http/sendResponse.js';
import { CartItemRepository } from '../infraestructure/cartitem.repository.js';
import { CreateCartItemUseCase } from '../application/CreateCartItemUseCase.js';
import { ListCartItemsUseCase } from '../application/ListCartItemsUseCase.js';
import { GetCartItemUseCase } from '../application/GetCartItemUseCase.js';
import { UpdateCartItemUseCase } from '../application/UpdateCartItemUseCase.js';
import { DeleteCartItemUseCase } from '../application/DeleteCartItemUseCase.js';

const repository = new CartItemRepository();

export class CartItemController {
  async index(request, response, next) {
    try {
      const useCase = new ListCartItemsUseCase(repository);
      const cartItems = await useCase.execute(request.params.userId);
      return sendResponse(response, 200, cartItems);
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const useCase = new GetCartItemUseCase(repository);
      const cartItem = await useCase.execute(request.params.id);
      return sendResponse(response, 200, cartItem);
    } catch (error) {
      next(error);
    }
  }

  async store(request, response, next) {
    try {
      const useCase = new CreateCartItemUseCase(repository);
      const cartItem = await useCase.execute(request.body);
      return sendResponse(response, 201, cartItem, 'Item adicionado ao carrinho com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(request, response, next) {
    try {
      const useCase = new UpdateCartItemUseCase(repository);
      const cartItem = await useCase.execute(request.params.id, request.body);
      return sendResponse(response, 200, cartItem, 'Item atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const useCase = new DeleteCartItemUseCase(repository);
      await useCase.execute(request.params.id);
      return sendResponse(response, 200, null, 'Item removido do carrinho com sucesso');
    } catch (error) {
      next(error);
    }
  }
}