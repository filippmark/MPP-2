const User = require('../models/user');
const validator = require('validator');
const jwtHelpers = require('../helpers/jwtHelpers');

exports.createNewUser = async (req, res, next) => {

    console.log(req.body);

    const { email, password } = req.body;

    try {

        if (validator.isEmail(email)) {

            const userWithSameEmail = await User.findOne({ email });

            if (!userWithSameEmail) {

                const newUser = new User({ email, password });

                await newUser.save();

                res.sendStatus(200);
            } else {
                res.status(500).send('This email is busy');
            }

        } else {
            res.status(500).send('Please, use another email.');
        }

    } catch (err) {
        console.log(err);
    }

}

exports.checkForUserExistence = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (user) {

            user.validPassword(password, (err, result) => {
                if (result) {
                    jwtHelpers.createToken(res, { email, id: user._id });
                } else {
                    return res.status(401).send('Incorrect password');
                }
            })

        } else {
            res.status(401).send('There are no such user.');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}