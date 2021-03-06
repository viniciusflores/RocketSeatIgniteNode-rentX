import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carRoutes } from './car.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRecoveryRoutes } from './passwordRecovery.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/cars', carRoutes);
router.use('/categories', categoriesRoutes);
router.use('/rentals', rentalRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/password', passwordRecoveryRoutes);
router.use(authenticateRoutes);

export { router };
