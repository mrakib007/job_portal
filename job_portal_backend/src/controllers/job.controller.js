import { createJobPost, getJobList } from "../services/job.service.js"
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const getJobs = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getJobList(page,limit);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'uploads/companyLogos/');
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({storage});

export const createJob = async (req,res) =>{
    try {
        const jobData = {
            ...req.body,
            company_logo: req.file ? req.file.filename : null,
            skills: req.body.skills ? req.body.skills.split(',') : [],
        };
        const result = await createJobPost(jobData);
        res.status(201).json(result);   
    }catch(error){
        if(req.file){
            fs.unlinkSync(`uploads/companyLogos/${req.file.filename}`); 
        }
        res.status(400).json({message: error.message});
    }
};