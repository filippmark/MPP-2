const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRouter = require("./routes/tasks");
require('dotenv').config();

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', orderRouter);

app.get("/", (req, res) => {
    res.send("vse chetka");
})


app.listen(8080, () => {
    console.log("Server started")
})