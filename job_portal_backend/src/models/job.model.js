import pool from "../config/db.js";

export const getJobById = async (id) => {
  const result = await pool.query(
    `select * from jobs where id = $1 and is_active = true`,
    [id]
  );
  return result.rows[0];
};

export const getAllJobs = async (limit, offset) => {
  const result = await pool.query(
    `select * from jobs where is_active = true order by created_at DESC limit $1 offset $2`,
    [limit, offset]
  );
  const countResult = await pool.query(
    `select count(*) from jobs where is_active = true`
  );
  return {
    jobs: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
  };
};

export const createJob = async (jobData) => {
  const {
    title,
    description,
    company_name,
    location,
    salary_min,
    salary_max,
    job_type,
    experience_level,
    skills,
    company_logo,
    posted_by,
  } = jobData;
  const result = await pool.query(
    `insert into jobs (title,description,company_name,location,salary_min,salary_max,job_type,experience_level,skills,company_logo,posted_by)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning id,title,company_name,created_at`,
    [
      title,
      description,
      company_name,
      location,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      skills,
      company_logo,
      posted_by,
    ]
  );
  return result.rows[0];
};

export const updateJob = async (id, jobData) => {
  const {
    title,
    description,
    company_name,
    location,
    salary_min,
    salary_max,
    job_type,
    experience_level,
    skills,
    company_logo,
  } = jobData;
  const result = await pool.query(
    `UPDATE jobs SET title = $1, description = $2, company_name = $3, location = $4, 
         salary_min = $5, salary_max = $6, job_type = $7, experience_level = $8, 
         skills = $9, company_logo = $10, updated_at = CURRENT_TIMESTAMP
         WHERE id = $11 AND is_active = true
         RETURNING *`,
    [
      title,
      description,
      company_name,
      location,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      skills,
      company_logo,
      id,
    ]
  );
  return result.rows[0];
};

export const searchJobs = async (limit, offset, filters = {}) => {
  const {
    title,
    location,
    job_type,
    experience_level,
    salary_min,
    salary_max,
    skills,
  } = filters;
  
  let query = `SELECT * FROM jobs WHERE is_active = true`;
  let countQuery = `SELECT COUNT(*) FROM jobs WHERE is_active = true`;
  
  const params = [];
  let paramIndex = 1;

  if (title) {
    query += ` AND title ILIKE $${paramIndex}`;
    countQuery += ` AND title ILIKE $${paramIndex}`;
    params.push(`%${title}%`);
    paramIndex++;
  }

  if (location) {
    query += ` AND location ILIKE $${paramIndex}`;
    countQuery += ` AND location ILIKE $${paramIndex}`;
    params.push(`%${location}%`);
    paramIndex++;
  }

  if (job_type) {
    query += ` AND job_type = $${paramIndex}`;
    countQuery += ` AND job_type = $${paramIndex}`;
    params.push(job_type);
    paramIndex++;
  }

  if (experience_level) {
    query += ` AND experience_level = $${paramIndex}`;
    countQuery += ` AND experience_level = $${paramIndex}`;
    params.push(experience_level);
    paramIndex++;
  }

  if (salary_min) {
    query += ` AND salary_max >= $${paramIndex}`;
    countQuery += ` AND salary_max >= $${paramIndex}`;
    params.push(salary_min);
    paramIndex++;
  }

  if (salary_max) {
    query += ` AND salary_min <= $${paramIndex}`;
    countQuery += ` AND salary_min <= $${paramIndex}`;
    params.push(salary_max);
    paramIndex++;
  }

  if (skills) {
    query += ` AND skills && $${paramIndex}`;
    countQuery += ` AND skills && $${paramIndex}`;
    params.push(skills.split(","));
    paramIndex++;
  }

  query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  const countResult = await pool.query(countQuery, params.slice(0, -2));
  
  return {
    jobs: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
  };
};
