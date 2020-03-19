const User = require('../models/user');
const validator = require('validator');
const jwtHelpers = require('../helpers/jwtHelpers');

exports.createNewUser = async (_, { email, password }) => {

    console.log(email);

    try {

        if (validator.isEmail(email)) {

            const userWithSameEmail = await User.findOne({ email });

            if (!userWithSameEmail) {

                const newUser = new User({ email, password });

                await newUser.save();

                return 'successfully';

            } else {
                throw new Error('This email is busy');
            }

        } else {
            throw new Error('Please, use another email.');
        }

    } catch (err) {
        console.log(err);
        throw err;
    }

}

exports.checkForUserExistence = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (user) {

            user.validPassword(password, (err, result) => {
                if (result) {
                    jwtHelpers.createToken(res, { email, id: user._id });
                    res.status(200).send();

                } else {
                    res.status(500).send('Incorrect password');
                }
            })

        } else {
            res.status(500).send('There are no such user.');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}