const { Router } = require('express');
const router = Router();

const {
    usernameVal,
    signUpVal,
    valResult,
} = require('../middleware/validator');

const {
    signUp,
    usernameCheck,
} = require('../controllers/signUpController');

// router.post('/signup', [signUpVal, valResult], signUp);

router.post('/signup', signUpVal(), valResult, signUp);
router.post('/signup/username', usernameVal(), valResult, usernameCheck);

// router.post('/signup', signUp);

module.exports = router;