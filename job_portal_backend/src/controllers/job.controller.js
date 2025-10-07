import { getJobList } from "../services/job.service.js"

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