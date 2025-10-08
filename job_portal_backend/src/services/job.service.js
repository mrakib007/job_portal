import { createJob, getAllJobs, getJobById, updateJob } from "../models/job.model.js"

export const getSingleJob = async(id) =>{
    const job = await getJobById(id);
    if(!job){
        throw new Error("Job not found");
    }
    return {job};
};

export const getJobList = async (page=1,limit=10) =>{
    const offset = (page -1) * limit;
    const {jobs,total} = await getAllJobs(limit,offset);
    return {
        jobs,
        pagination:{
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        },
    };
};

export const createJobPost = async (jobData) =>{
    const job = await createJob(jobData);
    return {job};
};

export const updateJobPost = async(id,jobData) =>{
    const job = await updateJob(id,jobData);
    if(!job){
        throw new Error("Job not found");
    }
    return {job};
}