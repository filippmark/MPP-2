const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/authentification');
const { graphqlExpress } = require('apollo-server-express');
const { isValidToken } = require('./helpers/jwtHelpers');
const schema = require('schema.js');
require('dotenv').config();

let app = express();

app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:3000',
    ],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', isValidToken, graphqlExpress(req => ({
    schema,
    context: {
        user: req.user
    }
})));


app.listen(8080, () => {
    console.log("Server started")
});