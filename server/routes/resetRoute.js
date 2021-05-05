const { Router } = require('express');
const router = new Router();

const {
    requestLink,
    resetPass,
} = require('../controllers/resetPassController');

const {
    requestLinkVal,
    resetPassVal,
    valResult,
} = require('../middleware/validator'); 

router.post('/request', requestLinkVal(), valResult, requestLink);

router.post('/reset', resetPassVal(), valResult, resetPass);

module.exports = router;