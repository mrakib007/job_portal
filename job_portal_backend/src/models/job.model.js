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