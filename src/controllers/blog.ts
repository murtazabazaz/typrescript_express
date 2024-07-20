import { Request, Response } from "express";
import { createblog, deleteBlog, getOneBlog, getblog, updateblog } from "../services/blog/blogServices";


export const createBlog = async (req: Request, res: Response) => {
    try {

        console.log('req.file', req.file)
        const userData = {
            ...req.body,
            imageUrl: req.file ? req.file.path : null,
            author: (req as any).user._id
        }
        await createblog(userData);
    console.log('here')
        res.status(201).json({ message: "blog created" });

    } catch (error) {
        console.log('error in create blog', JSON.stringify(error));
        return res.status(401).json({ message: 'error in create blog' });
    }

}

export const getBlog = async (req: Request, res: Response) => {
    try {
        const blog = await getblog();
        // logger.info('blog', blog)
        console.log('blog', blog)
        return res.status(200).json(blog);
    } catch (error) {
        console.log('error in get blog', JSON.stringify(error));
        return res.status(401).json({ message: 'error in get blog' });
    }

}

export const removeBlog = async (req: Request, res: Response) => {
    try {
        const blog = await deleteBlog(req.params.id);
        return res.status(200).json({ message: 'blog deleted' });

    } catch (error) {
      console.log('error in delete user', JSON.stringify(error));
        return res.status(401).json({ message: 'error in delete blog ' });
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const user = await updateblog(req.params.id, req.body);
        return res.status(200).json(user);

    } catch (error) {
        console.log('error in get user', JSON.stringify(error));
        return res.status(401).json({ message: 'error in update users' });
    }
}



export const getBlogById = async (req: Request, res: Response) => {
    try {
        console.log('here')
        const blog = await getOneBlog(req.params.id);
        console.log('there')
    console.log(blog)
        return res.status(200).json({ blog });
    } catch (error) {
        console.log('error in get blog by id', JSON.stringify(error));
        return res.status(401).json({ message: 'error in blog by id' });
    }
}

