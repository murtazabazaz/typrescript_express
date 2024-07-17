import  express from "express";
import { Router } from "express";
import { createUser } from "../controllers/user";
import { registerUserValidation } from "../middlewares/user/userValidator";

const router: Router = express.Router();

router.post('/user',registerUserValidation, createUser)


export default router;