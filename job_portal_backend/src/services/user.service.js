import { findUserByEmail, findUserById, getAllUsers, updateUserById } from "../models/user.model.js";

export const getUserProfile = async(userId) =>{
    const user = await findUserById(userId);
    if(!user) throw new Error('User not found');
    return {user};
}

export const getUserList = async(page=1,limit=10) =>{
    const offset = (page-1) * limit;
    const {users,total} = await getAllUsers(limit,offset);
    return {
        users,
        pagination:{
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        },
    };
};

export const updateUserProfile = async (userId, userData) => {
    const {email} = userData;
    if(email){
        const existingUser = await findUserByEmail(email);
        if(existingUser && existingUser.id !== userId){
            throw new Error('Email already in use');
        }
    }
    const updatedUser = await updateUserById(userId, userData);
    if(!updatedUser) throw new Error('User not found');
    return {user: updatedUser};
};
