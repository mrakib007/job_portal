import { createApplication, getJobApplications, getUserApplications } from "../models/application.model.js";

export const applyForJob = async (applicationData) =>{
    const application = await createApplication(applicationData);
    return {application};
};

export const getUserApplicationList = async (userId,page=1,limit=10) =>{
    const offset = (page -1) * limit;
    const{applications,total} = await getUserApplications(userId,limit,offset);
    return {
        applications,
        pagination:{
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        },
    };
};

export const getJobApplicationList = async (jobId,page=1,limit=10) =>{
    const offset = (page -1) * limit;
    const {applications,total} = await getJobApplications(jobId, limit, offset);
    return {
        applications,
        pagination:{
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        },
    };
};