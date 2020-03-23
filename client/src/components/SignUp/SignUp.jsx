import * as React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { isEmail } from 'validator';
import * as PasswordValidator from 'password-validator';
import './SignUp.css';
import openSocket from 'socket.io-client';
import { signUp } from '../../socketEvents';

const socket = openSocket('http://localhost:8080');

export default class SignIn extends React.Component {

    state = {
        email: '',
        password: '',
        password2: '',
        schema: null,
        signUpError: false,
        signUpErrorMsg: ''
    }

    componentDidMount() {

        let schema = new PasswordValidator();

        schema
            .is().min(5)
            .is().max(100)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().not().spaces()
            .is().not().oneOf(['Passw0rd', 'Password123', '12345678', 'qwerty']);

        this.setState({
            ...this.state,
            schema
        });

        socket.on(signUp, (data) => {
            if(data.error){
                this.setState({
                    ...this.state,
                    signUpError: data.error,
                })
            }else{
                this.props.history.push('/sign-in');
            }
        })
    }


    componentWillUnmount(){
        socket.close();
    }

    _handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    _handleSignUp = async (event) => {
        event.preventDefault();

        try {

            socket.emit(signUp, {
                email: this.state.email,
                password: this.state.password
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const isEmailInvalid = !isEmail(this.state.email);
        const isPasswordsAreDifferent = this.state.password !== this.state.password2;
        const isPasswordInvalid = this.state.schema ? !this.state.schema.validate(this.state.password) : true;

        return (
            <div className="SignUpWrapper">
                <Form>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email" invalid={this.state.email.length > 0 && isEmailInvalid} placeholder="type your email" onChange={this._handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="password" invalid={this.state.password.length > 0 && isPasswordInvalid} placeholder="type your password" onChange={this._handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password2" sm={2}> Repeat Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password2" id="password2" invalid={this.state.password2.length > 0 && isPasswordsAreDifferent} placeholder="repeat your password" onChange={this._handleChange} />
                        </Col>
                    </FormGroup>
                    <Button color="secondary" size="md" disabled={isEmailInvalid || isPasswordInvalid || isPasswordsAreDifferent} onClick={this._handleSignUp}> Sign up </Button>
                </Form>
                {this.state.signUpError && (<div className="error-block"> {this.state.signUpError} </div>)}
            </div>
        )
    }
}