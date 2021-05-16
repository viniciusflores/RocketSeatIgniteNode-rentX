import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryMock } from '../../repositories/mocks/CategoriesRepositoryMock';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryMock.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create a with same category name', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description test',
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
