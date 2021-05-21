import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarService } from './CreateCarService';

let createCarService: CreateCarService;
let carsRepository: CarsRepositoryMock;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMock();
    createCarService = new CreateCarService(carsRepository);
  });

  it('should be able to create car', async () => {
    const car = await createCarService.execute({
      name: 'Name of Car',
      description: 'Description of car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand of Car',
      category_id: 'Category',
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarService.execute({
        name: 'Name of Car',
        description: 'Description of car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand of Car',
        category_id: 'Category',
      });

      await createCarService.execute({
        name: 'Name of Car 2',
        description: 'Description of car 2',
        daily_rate: 150,
        license_plate: 'ABC-1234',
        fine_amount: 80,
        brand: 'Brand of Car 2',
        category_id: 'Category2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be possible to create a car with available true by default', async () => {
    const car = await createCarService.execute({
      name: 'Name of Car',
      description: 'Description of car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand of Car',
      category_id: 'Category',
    });

    expect(car.available).toBe(true);
  });
});
