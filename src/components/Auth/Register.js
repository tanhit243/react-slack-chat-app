import React from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn, FormInput } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: []
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormEmpty = this.isFormEmpty.bind(this);
        this.isFormVaild = this.isFormVaild.bind(this);
        this.isPasswordVaild = this.isPasswordVaild.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    isFormVaild() {
        let error;
        let errors = [];

        if(this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' };
            this.setState({errors: errors.concat(error)});
            return false;
        } else if(!this.isPasswordVaild(this.state)) {
            error = {message: 'Password is invaild'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        return true;
    }

    isFormEmpty({username, email, password, passwordConfirmation}) {
        return (
            !username.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    }

    isPasswordVaild({password,passwordConfirmation}) {
        if(password.length >= 6) {
            if(password === passwordConfirmation) {
                return true;
            }
        }
        return false;
    }

    displayError(errors) {
        console.log(errors.map((error, i) => <p key={i}>{error.message}</p>));
        return errors.map((error, i) => <p key={i}>{error.message}</p>);
    }

    handleChange(event) {
        this.setState({ [event.target.name ]: event.target.value });
    }

    handleSubmit(event) {
        if(this.isFormVaild()) {
            event.preventDefault();
            let email = event.target.email.value;
            let password = event.target.password.value;
            firebase
                .auth()
                .createUserWithEmailAndPassword(email,password)
                .then(user => {
                    console.log(user);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render () {
        return (
            <Grid centered className='app'>
                <GridColumn width='6'>
                    <Header as='h2' icon textAlign='center' color='orange'>
                        <Icon name='slack' />
                        Register for chatA
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment>
                            <FormInput icon='user'  iconPosition='left' placeholder='Username' type='text' name='username' onChange={this.handleChange} value={this.state.username} />
                            <FormInput icon='mail'  iconPosition='left' placeholder='Email' type='email' name='email' onChange={this.handleChange} value={this.state.email} />
                            <FormInput icon='write' iconPosition='left' placeholder='Password' type='password' name='password' onChange={this.handleChange} vaule={this.state.password} />
                            <FormInput icon='repeat' iconPosition='left' placeholder='Password Confirmation' type='password' name='passwordConfirmation' onChange={this.handleChange} value={this.state.passwordConfirmation} />
                            <Button fluid color='orange'>Submit</Button>
                        </Segment>
                    </Form>
                    {
                        this.state.errors.length > 0 &&
                        (
                            <Message error>
                                <Message.Header>Error</Message.Header>
                                {this.displayError(this.state.errors)}                  
                            </Message>
                        )
                    }
                    <Message>
                        <p>New to chatA? <Link to='/login' >Login</Link></p>
                    </Message>
                </GridColumn>
            </Grid>
        );
    }
}

export default Register;
//https://reactjs.org/docs/introducing-jsx.html : parentheses,the curly braces