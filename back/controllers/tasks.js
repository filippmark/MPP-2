const Task = require('../models/task');

exports.getTasks = async (req, res, next) => {

    try {

        let { progress } = req.query;

        console.log(progress);

        let tasks = await Task.find({ progress: { $in: progress.split(',') } });

        return res.status(200).send(tasks);

    } catch (err) {
        return res.status(500).send();
    }

}

exports.addTask = async (req, res, next) => {


    const { description, date, file, progress } = req.body;

    try {

        let task = new Task({
            description,
            date,
            file,
            progress
        });

        task = await task.save();

        return res.sendStatus(200);

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

}

exports.updateTask = async (req, res) => {

    console.log(req.params);
    console.log(req.body);

    const { taskId } = req.params;
    const { description, date, file, progress } = req.body;

    const updatedTask = await Task.updateOne({ _id: taskId }, { $set: { description, date, file, progress } });

    res.status(200).send(updatedTask);
}