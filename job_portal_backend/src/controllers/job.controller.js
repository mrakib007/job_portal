import { getJobList } from "../services/job.service.js"

export const getJobs = async (req,res)=>{
    try {
        const result = await getJobList();
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};