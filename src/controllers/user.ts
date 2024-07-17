import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/user"
import { createuser, getAllUser } from "../services/user/userServices";
import { log } from "winston";

// creating register user...
export const createUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const isEmail = await User.findOne({email: email});

        if(isEmail){
            return res.status(200).json({"message": "Email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            ...req.body,
            email,
            password: hashedPassword,
        }
        await createuser(userData);

        res.status(201).json({message: "user created"});

    } catch (error) {
        console.error('error in create user', JSON.stringify(error));
        return res.status(401).json({message: "error in creating user"});
    }
}

// fetching all users..

export const getUsers = async (req: Request, res: Response) => {
  try {

    const user = await getAllUser();
    console.log('user', user);
    return res.status(200).json(user);
    
  } catch (error) {

    console.log('error in get users', JSON.stringify(error));
    res.status(401).json({message: 'error in get all users.'});
    
  }
}

