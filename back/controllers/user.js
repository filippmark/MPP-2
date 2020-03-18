const User = require('../models/user');
const validator = require('validator');
const jwtHelpers = require('../helpers/jwtHelpers');

exports.createNewUser = async ({ email, password }) => {

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

exports.checkForUserExistence = async ({ email, password }, { req, res }) => {

    console.log(email);

    try {

        const user = await User.findOne({ email });



        if (user) {

            user.validPassword(password, (err, result) => {
                if (err) {
                    throw new Error('Incorrect password');
                } else {
                    console.log('oke');
                    jwtHelpers.createToken(res, { email, id: user._id });
                    console.log(res);
                    return;
                }
            })

        } else {
            throw new Error('There are no such user.');
        }

    } catch (error) {
        console.log('kek');
        console.log(error);
        throw error;
    }
}