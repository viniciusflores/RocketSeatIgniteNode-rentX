import { CategoriesRepositoryMock } from '@modules/cars/repositories/mocks/CategoriesRepositoryMock';
import { CreateCategoryService } from '@modules/cars/useCases/createCategory/CreateCategoryService';
import { AppError } from '@shared/errors/AppError';

let createCategoryService: CreateCategoryService;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryService = new CreateCategoryService(categoriesRepositoryMock);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryService.execute(category);

    const categoryCreated = await categoriesRepositoryMock.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create a with same category name', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryService.execute(category);

    await expect(createCategoryService.execute(category)).rejects.toEqual(
      new AppError('Category already exists!'),
    );
  });
});
