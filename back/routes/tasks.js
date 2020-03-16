const tasksRouter = require('express').Router();
const tasksController = require('../controllers/tasks');
const jwtHelpers = require('../helpers/jwtHelpers');

tasksRouter.get('/tasks', jwtHelpers.isValidToken, tasksController.getTasks);

tasksRouter.post('/tasks', jwtHelpers.isValidToken, tasksController.addTask);

tasksRouter.put('/tasks/:taskId', jwtHelpers.isValidToken, tasksController.updateTask);

module.exports = tasksRouter;
