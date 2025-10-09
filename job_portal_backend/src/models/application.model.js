import pool from "../config/db.js";

export const createApplication = async(application)=>{
    const {job_id,user_id,resume_file,cover_letter} = application;
    const result = await pool.query(
       `INSERT INTO applications (job_id, user_id, resume_file, cover_letter) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, job_id, user_id, status, applied_at`,
        [job_id,user_id,resume_file,cover_letter]
    );
    return result.rows[0];
};

export const getUserApplications = async (userId,limit,offset) =>{
    const result = await pool.query(
        `select a.*,j.title,j.company_name from applications a join jobs j on a.job_id=j.id
        where a.user_id = $1 order by a.applied_at desc limit $2 offset $3`,
        [userId,limit,offset]
    );
    const countResult = await pool.query(
        'select count(*) from applications where user_id=$1',
        [userId]
    );
    return {
        applications : result.rows,
        total: parseInt(countResult.rows[0].count,10)
    };
};

export const getJobApplications = async (jobId,limit,offset) =>{
    const result = await pool.query(
        `select a.*,u.full_name,u.email from applications a join users u on a.user_id=u.id
        where a.job_id=$1 order by a.applied_at desc limit $2 offset $3`,
        [jobId,limit,offset]
    );
    const countResult = await pool.query(
        'select count(*) from applications where job_id=$1',
        [jobId]
    );
    return {
        applications: result.rows,
        total:parseInt(countResult.rows[0].count,10)
    };
}