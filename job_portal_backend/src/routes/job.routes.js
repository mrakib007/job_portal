/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - company_name
 *               - location
 *               - job_type
 *               - experience_level
 *               - posted_by
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job title
 *                 example: "Senior Software Engineer"
 *               description:
 *                 type: string
 *                 description: Job description
 *                 example: "We are looking for an experienced software engineer..."
 *               company_name:
 *                 type: string
 *                 description: Name of the company
 *                 example: "Tech Corp Inc."
 *               location:
 *                 type: string
 *                 description: Job location
 *                 example: "New York, NY"
 *               salary_min:
 *                 type: integer
 *                 description: Minimum salary
 *                 example: 80000
 *               salary_max:
 *                 type: integer
 *                 description: Maximum salary
 *                 example: 120000
 *               job_type:
 *                 type: string
 *                 enum: [full-time, part-time, contract, internship]
 *                 description: Type of job
 *                 example: "full-time"
 *               experience_level:
 *                 type: string
 *                 enum: [entry, mid, senior, executive]
 *                 description: Required experience level
 *                 example: "senior"
 *               skills:
 *                 type: string
 *                 description: Required skills (comma-separated)
 *                 example: "JavaScript,React,Node.js"
 *               company_logo:
 *                 type: string
 *                 format: binary
 *                 description: Company logo image file
 *               posted_by:
 *                 type: string
 *                 format: uuid
 *                 description: UUID of the user posting the job
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     title:
 *                       type: string
 *                       example: "Senior Software Engineer"
 *                     company_name:
 *                       type: string
 *                       example: "Tech Corp Inc."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid job_type. Must be one of: full-time, part-time, contract, internship"
 */

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Job retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     company_name:
 *                       type: string
 *                     location:
 *                       type: string
 *                     salary_min:
 *                       type: integer
 *                     salary_max:
 *                       type: integer
 *                     job_type:
 *                       type: string
 *                       enum: [full-time, part-time, contract, internship]
 *                     experience_level:
 *                       type: string
 *                       enum: [entry, mid, senior, executive]
 *                     skills:
 *                       type: array
 *                       items:
 *                         type: string
 *                     company_logo:
 *                       type: string
 *                     posted_by:
 *                       type: string
 *                       format: uuid
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job not found
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Senior Software Engineer"
 *               description:
 *                 type: string
 *                 example: "Updated job description..."
 *               company_name:
 *                 type: string
 *                 example: "Updated Tech Corp Inc."
 *               location:
 *                 type: string
 *                 example: "San Francisco, CA"
 *               salary_min:
 *                 type: integer
 *                 example: 90000
 *               salary_max:
 *                 type: integer
 *                 example: 130000
 *               job_type:
 *                 type: string
 *                 enum: [full-time, part-time, contract, internship]
 *                 example: "full-time"
 *               experience_level:
 *                 type: string
 *                 enum: [entry, mid, senior, executive]
 *                 example: "senior"
 *               skills:
 *                 type: string
 *                 description: Required skills (comma-separated)
 *                 example: "JavaScript,React,Node.js,Python"
 *               company_logo:
 *                 type: string
 *                 format: binary
 *                 description: New company logo image file (optional - if not provided, keeps existing logo)
 *               existing_logo:
 *                 type: string
 *                 description: Current logo filename (if not uploading new logo)
 *                 example: "1634567890-company-logo.png"
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     title:
 *                       type: string
 *                     company_name:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all active jobs (with pagination)
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of jobs per page (default is 10)
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       company_name:
 *                         type: string
 *                       location:
 *                         type: string
 *                       salary_min:
 *                         type: integer
 *                       salary_max:
 *                         type: integer
 *                       job_type:
 *                         type: string
 *                       experience_level:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 45
 *                     page:
 *                       type: integer
 *                       example: 2
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Bad request
 */

import express from 'express';
import { createJob, getJob, getJobs, updateJob, upload } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/:id', getJob);
router.put('/:id', upload.single('company_logo'), updateJob);
router.get('/',getJobs);
router.post('/',upload.single('company_logo'),createJob);

export default router;