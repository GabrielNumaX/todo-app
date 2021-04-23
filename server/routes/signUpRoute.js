const { Router } = require('express');
const router = Router();

const {
    signUpVal,
    valResult,
} = require('../middleware/validator');

const {
    signUp,
} = require('../controllers/signUpController');

// router.post('/signup', [signUpVal, valResult], signUp);

router.post('/signup', signUpVal(), valResult, signUp);

// router.post('/signup', signUp);

module.exports = router;