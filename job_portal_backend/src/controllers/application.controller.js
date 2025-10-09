import multer from 'multer';
import path from 'path';
import { applyForJob, getJobApplicationList, getUserApplicationList } from '../services/application.service.js';

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'uploads/resumes/');
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const uploadResume = multer({storage});

export const createApplication = async (req,res) =>{
    try{
        const applicationData = {
            ...req.body,
            resume_file: req.file ? req.file.filename : null
        };
        const result = await applyForJob(applicationData);
        res.status(201).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

export const getUserApplications = async (req,res) =>{
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getUserApplicationList(userId,page,limit);
        res.status(200).json(result);
    }catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getJobApplications = async (req,res) =>{
    try {
        const jobId = req.params.jobId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getJobApplicationList(jobId,page,limit);
        res.status(200).json(result);
    }catch (error) {
        res.status(400).json({message: error.message});
    }
};