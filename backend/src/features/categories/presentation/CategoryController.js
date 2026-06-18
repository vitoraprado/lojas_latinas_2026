import { sendResponse } from '../../../shared/http/sendResponse.js';
import { CategoryRepository } from '../infraestructure/category.repository.js';
import { CreateCategoryUseCase } from '../application/CreateCategoryUseCase.js';
import { ListCategoriesUseCase } from '../application/ListCategoriesUseCase.js';
import { GetCategoryUseCase } from '../application/GetCategoryUseCase.js';
import { UpdateCategoryUseCase } from '../application/UpdateCategoryUseCase.js';
import { DeleteCategoryUseCase } from '../application/DeleteCategoryUseCase.js';

const repository = new CategoryRepository();

export class CategoryController {
  async index(request, response, next) {
    try {
      const useCase = new ListCategoriesUseCase(repository);
      const categories = await useCase.execute();
      return sendResponse(response, 200, categories);
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const useCase = new GetCategoryUseCase(repository);
      const category = await useCase.execute(request.params.id);
      return sendResponse(response, 200, category);
    } catch (error) {
      next(error);
    }
  }

  async store(request, response, next) {
    try {
      const useCase = new CreateCategoryUseCase(repository);
      const category = await useCase.execute(request.body);
      return sendResponse(response, 201, category, 'Categoria criada com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(request, response, next) {
    try {
      const useCase = new UpdateCategoryUseCase(repository);
      const category = await useCase.execute(request.params.id, request.body);
      return sendResponse(response, 200, category, 'Categoria atualizada com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const useCase = new DeleteCategoryUseCase(repository);
      await useCase.execute(request.params.id);
      return sendResponse(response, 200, null, 'Categoria removida com sucesso');
    } catch (error) {
      next(error);
    }
  }
}