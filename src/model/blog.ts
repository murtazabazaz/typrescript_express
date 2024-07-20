import {Schema, model } from "mongoose";
import { IBlog } from "../types/types";

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    likeCount: {
        type: Number,
    },
    comment: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    }   

}); 

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog