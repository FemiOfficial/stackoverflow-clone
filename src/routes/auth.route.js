import express from 'express'

const authRouter = express.Router();

authRouter.get('/user', (req, res) => {
    console.log(req.body);
})

export default authRouter;