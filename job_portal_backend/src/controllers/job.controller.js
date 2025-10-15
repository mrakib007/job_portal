import { createJobPost, getJobList, getSingleJob, searchJobList, updateJobPost } from "../services/job.service.js"
import multer from 'multer';
import path from 'path';
import fs from 'fs';


export const getJob = async(req,res) =>{
    try {
        const {id} = req.params;
        const result = await getSingleJob(id);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

export const getJobs = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const hasFilters = req.query.title || req.query.location || req.query.job_type || 
                          req.query.experience_level || req.query.salary_min || 
                          req.query.salary_max || req.query.skills;
        
        let result;
        if (hasFilters) {
            const filters = {
                title: req.query.title,
                location: req.query.location,
                job_type: req.query.job_type,
                experience_level: req.query.experience_level,
                salary_min: req.query.salary_min ? parseInt(req.query.salary_min) : null,
                salary_max: req.query.salary_max ? parseInt(req.query.salary_max) : null,
                skills: req.query.skills,
            };
            result = await searchJobList(page, limit, filters);
        } else {
            result = await getJobList(page, limit);
        }
        
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

export const updateJob = async (req,res) =>{
    try{
        const {id} = req.params;
        const currentJob = await getSingleJob(id);
        
        const jobData = {
            ...req.body,
            company_logo: req.file ? req.file.filename : currentJob.job.company_logo,
            skills: req.body.skills ? req.body.skills.split(',') : [],
        };
        const result = await updateJobPost(id,jobData);
        res.status(200).json(result);
    }catch(error){
        if(req.file) {
            fs.unlinkSync(`uploads/companyLogos/${req.file.filename}`);
        }
        res.status(400).json({message: error.message});
    }
};

