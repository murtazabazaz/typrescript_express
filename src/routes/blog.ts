import express, { Router } from 'express';
import { createBlog, getBlog, getBlogById, removeBlog, updateBlog } from '../controllers/blog';
import { createUserSchema, validateSchema } from '../middlewares/user/userMiddlewares';
import isAuthenticated from '../middlewares/auth';
import multer from 'multer';
import path from 'path';


const router : Router = express.Router();

const upload = multer({ dest: 'blog/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'blogUploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//const upload = multer({storage: storage})

router.post('/blog',isAuthenticated , upload.single('imageUrl'), createBlog);

router.get('/blog', getBlog);

router.get('/blog/:id' , getBlogById)

router.delete('/blog/:id', isAuthenticated,removeBlog);

router.patch('/blog/:id',isAuthenticated ,updateBlog);

router.patch('/blog/:id', isAuthenticated ,validateSchema(createUserSchema.partial()), updateBlog);

// router.get('/blog/:id', getBlogById);

export default router;



