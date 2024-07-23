import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userSignupSchema,
  userSigninSchema,
  userGoogleAuthSchema,
} from '../validation/user-schemas.js';
import { authGoogleController } from '../controllers/auth-controllers.js';
import {
  signupController,
  verifyController,
  signinController,
  refreshController,
  signoutController,
  getGoogleOAuthController,
} from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.get('/verify', ctrlWrapper(verifyController));

authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post(
  '/confirm-google-auth',
  validateBody(userGoogleAuthSchema),
  ctrlWrapper(authGoogleController),
);
authRouter.post('/signout', ctrlWrapper(signoutController));
authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthController));

export default authRouter;
