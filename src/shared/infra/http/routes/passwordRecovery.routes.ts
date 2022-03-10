import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRecoveryRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRecoveryRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRecoveryRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRecoveryRoutes };
