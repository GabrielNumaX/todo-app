const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');

const {
    isValidObjectId
} = require('../middleware/validator');

const taskController = {};

taskController.getAllTasks = async (req, res) => {

    const {
        user,
    } = req;

    if(!user) return res.status(400).send({message: 'Invalid User'});

    const tasks = await taskModel
                            .find({user: user.id})
                            .sort({date: -1});
                                // .sort({name: 1}) //1 asc | -1 desc

    if(!tasks) return res.status(204);

    return res.status(200).send(tasks);

}

taskController.postTask = async (req, res) => {

    const {
        user,
    } = req;

    const { 
        task 
    } = req.body;

    if(!user) return res.status(400).send({message: 'Invalid User'});

    if(!task) return res.status(400).send({message: 'No Task sent'});

    const newTask = new taskModel({
        task: task.task,
        date: task.date,
        user: user.id,
    })

    await newTask.save();

    return res.status(200).send(newTask);
}

taskController.delTask = async (req, res) => {

    const { 
        taskId 
    } = req.body;

    if(!taskId) return res.status(400).send({message: 'No Task Found'});

    if(!isValidObjectId(taskId)) return res.status(400).send({message: 'Invalid Id'});

    await taskModel.findByIdAndRemove(taskId)

    return res.status(200).send({message: 'Task Deleted'});
}

taskController.putTask = async (req, res) => {

    const { 
        taskId,
        isChecked
    } = req.body;

    if(!taskId) return res.status(400).send({message: 'No Task Found'});

    if(!isValidObjectId(taskId)) return res.status(400).send({message: 'Invalid Id'});

    // await taskModel.findByIdAndRemove(taskId)
    await taskModel.findByIdAndUpdate(taskId, {
        isChecked,
    })
                    

    return res.status(200).send({message: 'Task Updated'});
}

module.exports = taskController;  