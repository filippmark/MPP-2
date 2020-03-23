const User = require('../models/user');
const validator = require('validator');
const jwtHelpers = require('../helpers/jwtHelpers');
const {signIn, signUp} = require('../event-constants');


exports.createNewUser = async (socket, data) => {

    console.log(data);

    const { email, password } = data;

    try {

        if (validator.isEmail(email)) {

            const userWithSameEmail = await User.findOne({ email });

            if (!userWithSameEmail) {

                const newUser = new User({ email, password });

                await newUser.save();

                return socket.emit(signUp, { msg: 'successfully'}); 

            } else {
                return socket.emit(signUp, { error: 'This email is busy'});
            }

        } else {
            return socket.emit(signUp, { error: 'Please, use another email.'});
        }

    } catch (err) {
        console.log(err);
        return socket.emit(signUp, { error: 'Server error'});
    }

}

exports.checkForUserExistence = async (socket, data) => {

    console.log(data);

    const { email, password } = data;

    try {

        const user = await User.findOne({ email });

        if (user) {

            user.validPassword(password, (err, result) => {
                if (result) {
                    const token = jwtHelpers.createToken({ email, id: user._id });
                    return socket.emit(signIn, {token});
                } else {
                    return socket.emit(signIn, { error: 'Incorrect password'});
                }
            })

        } else {
            return socket.emit(signIn, { error: 'There are no such user.'});
        }

    } catch (error) {
        console.log(error);
        return socket.emit(signIn, { error: 'Server error'});
    }
}