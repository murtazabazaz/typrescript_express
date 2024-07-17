import mongoose from "mongoose";
import User from "../../model/user";
import { Iuser } from "../../types/types";
import bcrypt from 'bcrypt';

export const getAllUser = async () => await User.find();

export const createuser = async (user: Iuser) => {
    const newUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    });
    return newUser;
}

export const deleteUser = async (id: string) => await User.findByIdAndDelete(id);

export const updateUser = async (id: string, user: Iuser) => await User.findByIdAndUpdate(id, user, {new: true});

export const getOne = async (id: string) => await User.findById(id);