import dayjs from 'dayjs';

import { RentalsRepositoryMock } from '@modules/rentals/repositories/mocks/RentalsRepositoryMock';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalService } from './CreateRentalService';

let createRentalService: CreateRentalService;
let dayjsDataProvider: DayjsDateProvider;
let rentalsRepositoryMock: RentalsRepositoryMock;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryMock = new RentalsRepositoryMock();
    dayjsDataProvider = new DayjsDateProvider();
    createRentalService = new CreateRentalService(
      rentalsRepositoryMock,
      dayjsDataProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalService.execute({
      user_id: '123',
      car_id: '123',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if is another open to same user', async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: '123',
        car_id: '123',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalService.execute({
        user_id: '123',
        car_id: '1234',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental if is another open to same car', async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: '123',
        car_id: '123',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalService.execute({
        user_id: '1234',
        car_id: '123',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: '123',
        car_id: '123',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
