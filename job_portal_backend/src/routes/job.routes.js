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
import { createJob, getJobs, upload } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/',getJobs);
router.post('/',upload.single('company_logo'),createJob);

export default router;