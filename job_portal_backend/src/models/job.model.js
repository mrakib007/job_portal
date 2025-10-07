import pool from "../config/db.js"


export const getAllJobs = async () =>{
    const result = await pool.query(
        'select * from jobs where is_active = true order by created_at DESC'
    );
    return result.rows;
}