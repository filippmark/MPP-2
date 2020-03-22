const Task = require('../models/task');
const {isValidToken} = require('../helpers/jwtHelpers');
const {getTasks, postTask,  updateTask, deleteTask} = require('../event-constants');

exports.getTasks = async (socket, data) => {

    const { progress, token } = data;

    const userId = isValidToken(token);

    if(userId){
        try {
            let tasks = await Task.find({ userId: req.user.id, progress: { $in: progress.split(',') } });
    
            socket.emit(getTasks, {tasks});
    
        } catch (err) {
            console.log(err);
            socket.emit(getTasks, {error: 'Server error'});
        }
    }

    socket.emit(getTasks, {error: 'Unauthorised'});
    
}

exports.addTask = async (socket, data) => {
    const { description, date, file, progress, token } = data;

    const userId = isValidToken(token);
    
    if(userId){
        try {

            let task = new Task({
                description,
                date,
                file,
                progress,
                userId: req.user.id
            });
    
            task = await task.save();
    
            socket.emit(deleteTask, {task});
    
        } catch (err) {
            console.log(err);
            socket.emit(postTask, {error: 'Server error'});
        }
    }

    socket.emit(getTasks, {error: 'Unauthorised'});

}

exports.updateTask = async (socket, data) => {

    const { taskId, description, date, file, progress, token } = data;

    const userId = isValidToken(token);
    
    if(userId){
        try {

            const updatedTask = await Task.updateOne({ _id: taskId }, { $set: { description, date, file, progress } });

            socket.emit(deleteTask, updatedTask);

        } catch (err) {
            console.log(err);
            socket.emit(updateTask, {error: 'Server error'});
        }
    }

    socket.emit(getTasks, {error: 'Unauthorised'});
    
}

exports.deleteTask = async (socket, data) => {

    const { taskId, token } = data;

    const userId = isValidToken(token);
    
    if(userId){
        try {

            const result = await Task.findByIdAndDelete(taskId);
    
            console.log(result);
    
            socket.emit(deleteTask, {msg: 'successfully'});
    
        } catch (error) {
            console.log(err);
            socket.emit(deleteTask, {error: 'Server error'});
        }
    }

    socket.emit(getTasks, {error: 'Unauthorised'});

}