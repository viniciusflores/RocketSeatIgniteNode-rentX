import { getRepository, Repository } from 'typeorm';

import { ICreateRentalsDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalsDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id });
    return rental;
  }
}

export { RentalsRepository };