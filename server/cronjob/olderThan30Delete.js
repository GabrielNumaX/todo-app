const taskModel = require('../models/taskModel');


const deleteOlderThan30 = async () => {

    const today = new Date().getTime();

    const older = today - (1000 * 60 * 60 * 24 * 30); //last number are the days

    await taskModel.deleteMany({date: {$lt: older } })

}

module.exports = deleteOlderThan30;