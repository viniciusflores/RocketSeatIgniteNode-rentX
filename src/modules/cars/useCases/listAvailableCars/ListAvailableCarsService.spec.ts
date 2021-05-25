import { CarsRepositoryMock } from '@modules/cars/repositories/mocks/CarsRepositoryMock';

import { ListAvailableCarsService } from './ListAvailableCarsService';

let listAvailableCarsService: ListAvailableCarsService;
let carsRepositoryMock: CarsRepositoryMock;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    listAvailableCarsService = new ListAvailableCarsService(carsRepositoryMock);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Name of Car',
      description: 'Description of car',
      daily_rate: 100,
      license_plate: 'ABC-2235',
      fine_amount: 60,
      brand: 'Brand of Car',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsService.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Name of Car 2',
      description: 'Description of car 2',
      daily_rate: 100,
      license_plate: 'ABC-2234',
      fine_amount: 60,
      brand: 'Brand-Car',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsService.execute({ brand: 'Brand-Car' });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Name of Car 3',
      description: 'Description of car 3',
      daily_rate: 100,
      license_plate: 'ABC-2231',
      fine_amount: 60,
      brand: 'Brand-Car',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsService.execute({
      name: 'Name of Car 3',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Name of Car 3',
      description: 'Description of car 3',
      daily_rate: 100,
      license_plate: 'ABC-2231',
      fine_amount: 60,
      brand: 'Brand-Car',
      category_id: 'category_id_to_test',
    });

    const cars = await listAvailableCarsService.execute({
      category_id: 'category_id_to_test',
    });

    expect(cars).toEqual([car]);
  });
});
