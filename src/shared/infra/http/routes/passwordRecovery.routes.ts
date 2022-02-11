import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRecoveryRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRecoveryRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordRecoveryRoutes };
