import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './SignIn.css';
import { isEmail } from 'validator';
import * as PasswordValidator from 'password-validator';
import { AuthContext } from '../../context';

export default class SignIn extends React.Component {

    static contextType = AuthContext;

    state = {
        email: '',
        password: '',
        schema: null,
        signInError: ''
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
        })
    }




    _handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    _handleSignIn = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post('http://localhost:8080/signIn', {
                email: this.state.email,
                password: this.state.password
            }, { withCredentials: true });

            console.log(response);
            this.context.setAuthorised(true);

            this.props.history.push('/');

        } catch (error) {
            console.log(error);
            this.setState({ signInError: error.response.data })
            this.context.setAuthorised(false);
        }
    }

    render() {
        const isEmailInvalid = !isEmail(this.state.email);
        const isPasswordInvalid = this.state.schema ? !this.state.schema.validate(this.state.password) : true;

        return (
            <div className="SignInWrapper">
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
                    <Button color="secondary" size="md" disabled={isEmailInvalid || isPasswordInvalid} onClick={this._handleSignIn}> Sign in </Button>
                </Form>
                {this.state.signInError && (<div className="error-block"> {this.state.signInError} </div>)}
            </div>
        )
    }
}