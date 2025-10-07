import { getAllJobs } from "../models/job.model.js"

export const getJobList = async () =>{
    const jobs = await getAllJobs();
    return {jobs};
};