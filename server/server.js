require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./db/db');

// router routes
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');

const app = express();

const port = parseInt(process.env.PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== "production";

app.use(express.json());
app.use(cors());

app.use( signUpRoute );
app.use( loginRoute );
app.use( taskRoute ); 

app.listen(port, () => {

    console.log(`Server Running on http://localhost:${port}`);
})