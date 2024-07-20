import  express from "express";
import { Router } from "express";
import { createUser, getUserById, getUsers, login, removeUser, updateUser } from "../controllers/user";
import { loginUserValidation, registerUserValidation } from "../middlewares/user/userValidator";
import { createUserSchema, loginUserSchema, validateSchema } from "../middlewares/user/userMiddlewares";
import isAuthenticated from "../middlewares/auth";
import multer from 'multer';
import path from 'path';

const router: Router = express.Router();
const upload = multer({ dest: 'user/profilePic/' })

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//const upload = multer({ storage: storage })

router.post('/user', upload.single('profilePic'), validateSchema(createUserSchema), createUser);

router.get('/user', getUsers);

router.delete('/user/:id',isAuthenticated,  removeUser);

router.patch('/user/:id', validateSchema(createUserSchema.partial()), updateUser);

router.get('/user/:id', getUserById);

router.post ('/login', loginUserValidation , login);

export default router;