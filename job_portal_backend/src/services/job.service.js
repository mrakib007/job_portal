import { getAllJobs } from "../models/job.model.js"

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