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
import { getJobs } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/',getJobs);

export default router;