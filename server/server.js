require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./db/db');

// router routes
const signUpRoute = require('./routes/signUpRoute');

const app = express();

const port = parseInt(process.env.PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(express.json());

app.use( signUpRoute );

app.listen(port, () => {

    console.log(`Server Running on http://localhost:${port}`);
})