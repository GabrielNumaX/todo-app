require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const port = parseInt(process.env.PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(express.json());

app.listen(port, () => {

    console.log(`Server Runnin on http://localhost:${port}`);
})