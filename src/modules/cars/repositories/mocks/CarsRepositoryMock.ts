import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryMock implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAllAvailableCars(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const allAvailable = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (car.category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return allAvailable;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryMock };
