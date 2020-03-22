const {getTasks, postTask,  updateTask, deleteTask, signIn, signUp} = require('../event-constants');
const taskControllers = require('../controllers/tasks');
const userControllers = require('../controllers/user');

module.exports = setUpEventsHandlers = (socket) => {
    socket.on(signIn, userControllers.checkForUserExistence(socket, data));
    socket.on(signUp, userControllers.createNewUser(socket, data));
    socket.on(getTasks, taskControllers.getTasks(socket, data))
    socket.on(postTask, taskControllers.addTask(socket, data));
    socket.on(updateTask, taskControllers.updateTask(socket, data));
    socket.on(deleteTask, taskControllers.deleteTask(socket, data));
}