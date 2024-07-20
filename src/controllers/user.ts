import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/user"
import { createuser, deleteUser, getAllUser, getOne, updateuser, findUser} from "../services/user/userServices";
import jwt from "jsonwebtoken";
import { IUser } from "../types/types";


// creating register user...
export const createUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password} = req.body as IUser;

        console.log('req.body', req.body.firstName);

        console.log('req.file', req.file);

        const isEmail = await findUser( email );

        if(isEmail){
            return res.status(200).json({"message": "Email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePic: req.file ? req.file.path : null,
        }
       await createuser(userData);

       console.log('userData', userData);

       return res.status(201).json(userData);

    } catch (error) {
        console.log('error in create user', JSON.stringify(error));
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

export const removeUser = async (req: Request, res: Response) => {
    try {
        const user = await deleteUser(req.params.id);
      return res.status(200).json({ message: 'user deleted' });
      
  } catch (error) {
      console.log('error in get user', JSON.stringify(error));
      return res.status(401).json({ message: 'error in get users' });
  }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await updateuser(req.params.id, req.body);
      return res.status(200).json(user);
      
    } catch (error) {
        console.log('error in get user', JSON.stringify(error));
        return res.status(401).json({ message: 'error in update users' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await getOne(req.params.id);
        return res.status(200).json({ user });
    } catch (error) {
        console.log('error in get user', JSON.stringify(error));
      return res.status(401).json({ message: 'error in getUserById users' });
    }
}

// login user...

export const login = async (req: Request, res: Response) => {

  try {
      const user = req.body;
      const { email, password } = user;
      const ifUserExists = await findUser( email);
      if (!ifUserExists) {
          res.status(404).json({
              status: 404,
              success: false,
              message: "User not found",
          });
          return;
      }
      const isPasswordMatched = await bcrypt.compare(password, ifUserExists.password);
      if (!isPasswordMatched) {
          res.status(400).json({
              status: 400,
              success: false,
              message: "wrong password",
          });
          return;
      }
      const token = jwt.sign(
          {
              _id: ifUserExists?._id,
              email: ifUserExists?.email
          },
          "secret",
          { expiresIn: "1d" }
      )
      res.status(200).json({
          status: 200,
          success: true,
          message: "login success",
          token: token,
      });
  } catch (error) {

      console.log('error in login user', JSON.stringify(error));
      return res.status(401).json({ message: 'error in login users' });
  }

}