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
            errors: [],
            loading: false
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
        return errors.map((error, i) => <p key={i}>{error.message}</p>);
    }

    handleInputError(errors,inputName) {
        errors.some(function(error) {
            return error.includes(inputName);
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name ]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.isFormVaild()) {
            this.setState({loading: true});
            let email = event.target.email.value;
            let password = event.target.password.value;
            firebase
                .auth()
                .createUserWithEmailAndPassword(email,password)
                .then(user => {
                    this.setState({loading: false});
                    console.log(user);
                })
                .catch(error => {
                    console.log(error);
                    this.setState({loading: false});
                    this.setState({errors: [].concat(error)})
                });
        }
    }

    render () {
        //Khoi tao bien la qua
        const {username, email, password, passwordConfirmation, errors, loading} = this.state;

        return (
            <Grid centered className='app'>
                <GridColumn width='6'>
                    <Header as='h2' icon textAlign='center' color='orange'>
                        <Icon name='slack' />
                        Register for chatA
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment>
                            <FormInput icon='user' className={this.handleInputError(errors,'email')} iconPosition='left' placeholder='Username' type='text' name='username' onChange={this.handleChange} value={username} />
                            <FormInput icon='mail'  iconPosition='left' placeholder='Email' type='email' name='email' onChange={this.handleChange} value={email} />
                            <FormInput icon='write' iconPosition='left' placeholder='Password' type='password' name='password' onChange={this.handleChange} vaule={password} />
                            <FormInput icon='repeat' iconPosition='left' placeholder='Password Confirmation' type='password' name='passwordConfirmation' onChange={this.handleChange} value={passwordConfirmation} />
                            <Button loading={loading ? loading : false} fluid color='orange'>Submit</Button>
                        </Segment>
                    </Form>
                    {
                        errors.length > 0 &&
                        (
                            <Message error>
                                <Message.Header>Error</Message.Header>
                                {this.displayError(errors)}                  
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