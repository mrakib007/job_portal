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

//user single get
export const findUserById = async(id) =>{
    const result = await pool.query(
        'Select id, full_name, email, role, created_at, updated_at from users where id = $1',[id]
    );
    return result.rows[0];
};

//update a user 
export const updateUserById = async (id,userData) =>{
    const {full_name,email} = userData;
    const result = await pool.query(
        'Update users set full_name = $1, email = $2 where id = $3 returning id,full_name,email,role,updated_at',[full_name,email,id]
    );
    return result.rows[0];
};
