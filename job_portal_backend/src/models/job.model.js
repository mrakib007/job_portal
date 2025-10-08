import pool from "../config/db.js"


export const getAllJobs = async (limit,offset) =>{
    const result = await pool.query(
        `select * from jobs where is_active = true order by created_at DESC limit $1 offset $2`,
        [limit,offset]
    );
    const countResult = await pool.query(
        `select count(*) from jobs where is_active = true`
    );
    return {
        jobs: result.rows,
        total: parseInt(countResult.rows[0].count, 10)
    };
}

export const createJob = async(jobData) =>{
    const {title,description,company_name,location,salary_min,salary_max,job_type,experience_level,skills,company_logo,posted_by} = jobData;
    const result = await pool.query(
        `insert into jobs (title,description,company_name,location,salary_min,salary_max,job_type,experience_level,skills,company_logo,posted_by)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning id,title,company_name,created_at`,
        [title,description,company_name,location,salary_min,salary_max,job_type,experience_level,skills,company_logo,posted_by]
    );
    return result.rows[0];
}