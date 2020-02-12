const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("vse chetka");
})


app.listen(8080, () => {
    console.log("Server started")
})