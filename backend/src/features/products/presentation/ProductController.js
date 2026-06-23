import { sendResponse } from '../../../shared/http/sendResponse.js';
import { ProductRepository } from '../infraestructure/product.repository.js';
import { CreateProductUseCase } from '../application/CreateProductUseCase.js';
import { ListProductsUseCase } from '../application/ListProductsUseCase.js';
import { GetProductUseCase } from '../application/GetProductUseCase.js';
import { UpdateProductUseCase } from '../application/UpdateProductUseCase.js';
import { DeleteProductUseCase } from '../application/DeleteProductUseCase.js';

const repository = new ProductRepository();

export class ProductController {
  async index(request, response, next) {
    try {
      const filters = request.query;
      const useCase = new ListProductsUseCase(repository);
      const products = await useCase.execute(filters);
      
      return sendResponse(response, 200, products);
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const useCase = new GetProductUseCase(repository);
      const product = await useCase.execute(request.params.id);
      return sendResponse(response, 200, product);
    } catch (error) {
      next(error);
    }
  }

  async store(request, response, next) {
    try {
      const useCase = new CreateProductUseCase(repository);
      const product = await useCase.execute(request.body);
      return sendResponse(response, 201, product, 'Produto criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(request, response, next) {
    try {
      const useCase = new UpdateProductUseCase(repository);
      const product = await useCase.execute(request.params.id, request.body);
      return sendResponse(response, 200, product, 'Produto atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const useCase = new DeleteProductUseCase(repository);
      await useCase.execute(request.params.id);
      return sendResponse(response, 200, null, 'Produto removido com sucesso');
    } catch (error) {
      next(error);
    }
  }
}