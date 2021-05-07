require('express-async-errors');
const error = require('./middleware/asyncErrors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const path = require('path');

require('./db/db');

// router routes
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');
const resetRoute = require('./routes/resetRoute');

const app = express();

const port = parseInt(process.env.PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== "production";

app.use(express.json());
app.use(cors());

app.use(signUpRoute);
app.use(loginRoute);
app.use(taskRoute);
app.use('/password', resetRoute);

console.log(path.join(__dirname, '..', 'build'))


if (process.env.NODE_ENV === 'production') {

    //serves react app  
    app.use(express.static(path.join(__dirname, '..', 'build')));

    app.get('*', (req, res) => {

        res.sendFile(path.join(__dirname, '..', 'build', 'index.html')) //relative path
    })

}

app.use(error);

app.listen(port, () => {

    console.log(`Server Running on http://localhost:${port}`);
})