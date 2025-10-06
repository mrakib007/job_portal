import pool from '../config/db.js';

//create a new user with email password.
export const createUser = async({full_name,email,password_hash,role})=>{
    const result = await pool.query(
        `INSERT INTO users (full_name,email,password_hash,role) values ($1,$2,$3,$4) RETURNING id,full_name,email,role`,
        [full_name,email,password_hash,role]
    );
    return result.rows[0];
};

//finding the user.
export const findUserByEmail = async(email)=>{
    const result = await pool.query('SELECT * FROM users where email = $1',[email]);
    return result.rows[0];
}
