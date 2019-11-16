import express from 'express';
import usercontrollers from '../controllers/users.controllers';

const userRouter = express.Router();

userRouter.delete('/deleteuser/:username',
  usercontrollers.deleteUser);

export default userRouter;
