import { getUserProfile, updateUserProfile } from "../services/user.service.js";

export const getProfile = async(req,res) =>{
    try{
        const userId = req.params.id;
        const result = await getUserProfile(userId);
        res.status(200).json(result);
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

export const updateProfile = async(req,res) =>{
    try{
        const userId = req.params.id;
        const userData = req.body;
        const result = await updateUserProfile(userId,userData);
        res.status(200).json(result);
    }catch(error) {
        res.status(400).json({message: error.message});
    }
};