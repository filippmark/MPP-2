import * as React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './SignIn.css';
import { isEmail } from 'validator';
import * as PasswordValidator from 'password-validator';
import { AuthContext } from '../../context';
import { signIn } from '../../socketEvents';
import {socket} from '../../App';

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
        });

        socket.on(signIn, (data) => {

            if(data.error){
                this.setState({ signInError: data.error });
                this.context.setAuthorised(false);
            }else{
                console.log(data);
                console.log(this.context);
                localStorage.setItem('jwt', data.token);
                this.context.setJWT(data.token);
                this.context.setAuthorised(true);
                this.props.history.push('/');
            }            

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
            socket.emit(signIn, {email: this.state.email, password: this.state.password});
        } catch (error) {
            console.log(error);
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