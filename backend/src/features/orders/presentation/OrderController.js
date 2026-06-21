import { sendResponse } from '../../../shared/http/sendResponse.js';
import { OrderRepository } from '../infraestructure/order.repository.js';
import { ProductRepository } from '../../products/infraestructure/product.repository.js';
import { CancelOrderUseCase } from '../application/CancelOrderUseCase.js';
import { CreateOrderUseCase } from '../application/CreateOrderUseCase.js';
import { ChangeOrderStatusUseCase } from '../application/ChangeOrderStatusUseCase.js';
import { ListOrdersUseCase } from '../application/ListOrdersUseCase.js';
import { GetOrderUseCase } from '../application/GetOrderUseCase.js';

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();

export class OrderController {
  async index(request, response, next) {
    try {
      const useCase = new ListOrdersUseCase(orderRepository);
      const orders = await useCase.execute(request.params.userId);
      return sendResponse(response, 200, orders);
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const useCase = new GetOrderUseCase(orderRepository);
      const order = await useCase.execute(request.params.id);
      return sendResponse(response, 200, order);
    } catch (error) {
      next(error);
    }
  }

  async store(request, response, next) {
    try {
      const useCase = new CreateOrderUseCase(orderRepository);
      const order = await useCase.execute(request.body);
      return sendResponse(response, 201, order, 'Pedido criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(request, response, next) {
    try {
      const useCase = new ChangeOrderStatusUseCase(orderRepository);
      const { status } = request.body; 
      const order = await useCase.execute(request.params.id, status);
      return sendResponse(response, 200, order, 'Status do pedido atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const useCase = new CancelOrderUseCase(orderRepository, productRepository);
      
      await useCase.execute(request.params.id);
      return sendResponse(response, 200, null, 'Pedido cancelado com sucesso');
    } catch (error) {
      next(error);
    }
  }
}