import Blog from "../../model/blog";
import { IBlog } from "../../types/types";


// export const createblog = async (blog : IBlog) => await Blog.create(blog);

export const createblog = async ({title, description, likeCount, comment, imageUrl, author} : IBlog) => {
    const newBlog = await Blog.create({
        title,
        description , 
        likeCount,
        comment,
        imageUrl,
        author
    });
    return newBlog;
}

export const getblog = async () => await Blog.find();

export const deleteBlog = async (id : string) => await Blog.findByIdAndDelete(id);

export const updateblog = async (id : string, user : IBlog) => await Blog.findByIdAndUpdate(id, user, {new : true});

export const getOneBlog = async (id : string) => await Blog.findById(id);



