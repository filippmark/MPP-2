const User = require('../models/user');
const validator = require('validator');
const jwtHelpers = require('../helpers/jwtHelpers');
const {signIn, signUp} = require('../event-constants');


exports.createNewUser = async (socket, data) => {

    const { email, password } = data;

    try {

        if (validator.isEmail(email)) {

            const userWithSameEmail = await User.findOne({ email });

            if (!userWithSameEmail) {

                const newUser = new User({ email, password });

                await newUser.save();

                socket.emit(signUp, { msg: 'successfully'}); 

            } else {
                socket.emit(signUp, { error: 'This email is busy'});
            }

        } else {
            socket.emit(signUp, { error: 'Please, use another email.'});
        }

    } catch (err) {
        console.log(err);
        socket.emit(signUp, { error: 'Server error'});
    }

}

exports.checkForUserExistence = async (socket, data) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (user) {

            user.validPassword(password, (err, result) => {
                if (result) {
                    const token = jwtHelpers.createToken(res, { email, id: user._id });
                    socket.emit(signIn, {token});
                } else {
                    socket.emit(signIn, { error: 'Incorrect password'});
                }
            })

        } else {
            socket.emit(signIn, { error: 'There are no such user.'});
        }

    } catch (error) {
        console.log(error);
        socket.emit(signIn, { error: 'Server error'});
    }
}