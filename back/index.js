const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/authentification');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const { isValidToken } = require('./helpers/jwtHelpers');
const { schema, resolvers } = require('./graphql/schema');
const { removeToken } = require('./helpers/jwtHelpers');
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

app.use('/signOut', removeToken);

app.use('/graphql', isValidToken, graphqlHTTP((req, res) => ({
    schema: buildSchema(schema),
    rootValue: resolvers,
    graphiql: true,
    context: {
        req,
        res
    }
})));


app.listen(8080, () => {
    console.log("Server started")
});