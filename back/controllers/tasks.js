const Task = require('../models/task');
const { Op } = require("sequelize");

exports.getTasks = async (req, res, next) => {

    const { progress } = req.query;

    try {
        let tasks = await Task.findAll({where: { userId: req.user.id, progress: { [Op.in] : progress.split(',') } }, raw: true});

        console.log(tasks);

        return res.status(200).send(tasks);

    } catch (err) {
        return res.status(500).send();
    }

}

exports.addTask = async (req, res, next) => {
    const { description, date, file, progress } = req.body;

    try {

        const task =  await Task.create({
            description,
            date,
            file,
            progress,
            userId: req.user.id
        });

        return res.status(200).send(task);

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

}

exports.updateTask = async (req, res) => {

    const { taskId } = req.params;
    const { description, date, file, progress } = req.body;

    try {

        const updatedTask = await Task.update({ description, date, file, progress },{where: { id: taskId }} );

        res.status(200).send(updatedTask);

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.deleteTask = async (req, res) => {

    console.log(req.params);

    const { taskId } = req.params;

    try {

        console.log("deletion");

        const result = await Task.destroy({
            where:{
                id: taskId
            }
        });

        console.log(result);

        res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }

}