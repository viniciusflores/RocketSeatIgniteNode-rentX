import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';
import { SpecificationsRepositoryMock } from '@modules/cars/repositories/mocks/SpecificationsRepositoryMock';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationService } from './CreateCarSpecificationService';

let createCarSpecificationService: CreateCarSpecificationService;
let carsRepositoryMock: CarsRepositoryMock;
let specificationsRepositoryMock: SpecificationsRepositoryMock;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    specificationsRepositoryMock = new SpecificationsRepositoryMock();
    createCarSpecificationService = new CreateCarSpecificationService(
      carsRepositoryMock,
      specificationsRepositoryMock,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Name of Car 3',
      description: 'Description of car 3',
      daily_rate: 100,
      license_plate: 'ABC-2231',
      fine_amount: 60,
      brand: 'Brand-Car',
      category_id: 'category_id',
    });

    const specification = await specificationsRepositoryMock.create({
      name: 'test',
      description: 'test',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('should be able to add a new specification to a now-existent car ', () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['123456'];

      await createCarSpecificationService.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
