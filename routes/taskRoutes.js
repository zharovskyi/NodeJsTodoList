import express from 'express';
import * as taskController from '../controllers/taskController.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.use(checkAuth);

/**
 * @openapi
 * '/api/task':
 *  post:
 *    tags:
 *    - Task
 *    summary: Create a task
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string
 *                default: Buy smt
 *    responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad request
 */

router.get('/task', taskController.getTask);
router.get('/task/all', checkAdmin, taskController.getAllTasks);
router.get('/task/:id', taskController.getTasksByUserId);
router.post('/task', taskController.createTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

export default router;
