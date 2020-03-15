const tasksRouter = require('express').Router();
const tasksController = require('../controllers/tasks');

tasksRouter.get('/tasks', tasksController.getTasks);

tasksRouter.post('/tasks', tasksController.addTask);

tasksRouter.put('/tasks/:taskId', tasksController.updateTask);

module.exports = tasksRouter;
