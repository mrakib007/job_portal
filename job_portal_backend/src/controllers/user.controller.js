import { getUserList, getUserProfile, updateUserProfile } from "../services/user.service.js";
import multer from 'multer';
import fs from 'fs';

export const getProfile = async(req,res) =>{
    try{
        const userId = req.params.id;
        const result = await getUserProfile(userId);
        res.status(200).json(result);
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

export const getUsers = async (req,res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getUserList(page,limit);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'uploads/userPhotos/');
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({storage});

export const updateProfile = async(req,res) =>{
    try{
        const userId = req.params.id;
        const currentUser = await getUserProfile(userId);
        const userData = {
            ...req.body,
            photo: req.file ? req.file.filename : currentUser.user.photo
        };
        const result = await updateUserProfile(userId,userData);
        res.status(200).json(result);
    }catch(error) {
        if(req.file) {
            fs.unlinkSync(`uploads/userPhotos/${req.file.filename}`);
        }
        res.status(400).json({message: error.message});
    }
};