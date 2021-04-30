const { Router } = require('express');
const router = new Router();

const {
    getAllTasks,
    postTask,
    delTask,
    putTask,
} = require('../controllers/taskController');

const {
    taskVal,
    taskEditVal,
    valResult,
} = require('../middleware/validator');

const checkJwt = require('../middleware/checkJwt');

router.post('/task', checkJwt, taskVal(), valResult, postTask);
router.get('/task', checkJwt, getAllTasks);
router.delete('/task', checkJwt, delTask);
router.put('/task', checkJwt, taskEditVal(), valResult, putTask);

module.exports = router;