/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - job_id
 *               - user_id
 *             properties:
 *               job_id:
 *                 type: integer
 *                 description: ID of the job to apply for
 *                 example: 1
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user applying
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               cover_letter:
 *                 type: string
 *                 description: Cover letter text
 *                 example: "I am interested in this position..."
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PDF, DOC, DOCX)
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 application:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     job_id:
 *                       type: integer
 *                     user_id:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     applied_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/applications/user/{userId}:
 *   get:
 *     summary: Get user's applications with pagination
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
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
 *         description: Number of applications per page (default is 10)
 *     responses:
 *       200:
 *         description: User applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       job_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       company_name:
 *                         type: string
 *                       status:
 *                         type: string
 *                       applied_at:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Get applications for a specific job with pagination
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
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
 *         description: Number of applications per page (default is 10)
 *     responses:
 *       200:
 *         description: Job applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: string
 *                       full_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       status:
 *                         type: string
 *                       applied_at:
 *                         type: string
 *                         format: date-time
 *                       resume_file:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: Bad request
 */


import express from 'express';
import { createApplication, getJobApplications, getUserApplications, uploadResume } from '../controllers/application.controller.js';

const router = express.Router();

router.post('/',uploadResume.single('resume'),createApplication);
router.get('/user/:userId', getUserApplications);
router.get('/job/:jobId', getJobApplications);

export default router;