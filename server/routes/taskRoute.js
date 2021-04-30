const { Router } = require('express');
const router = new Router();

const {
    getAllTasks,
    postTask,
    delTask,
} = require('../controllers/taskController');

const {
    taskVal,
    valResult,
} = require('../middleware/validator');

const checkJwt = require('../middleware/checkJwt');

router.post('/task', checkJwt, taskVal(), valResult, postTask);
router.get('/task', checkJwt, getAllTasks);
router.delete('/task', checkJwt, delTask);

module.exports = router;