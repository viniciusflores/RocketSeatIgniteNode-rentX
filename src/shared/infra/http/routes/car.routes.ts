import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post('/', createCarController.handle);

export { carRoutes };
