import React from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn, FormInput } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormEmpty = this.isFormEmpty.bind(this);
        this.isFormVaild = this.isFormVaild.bind(this);
        this.displayError = this.displayError.bind(this);
        this.checkAvailability = this.checkAvailability.bind(this);
    }

    isFormVaild() {
        let error;
        let errors = [];

        if(this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' };
            this.setState({errors: errors.concat(error)});
            return false;
        }
        return true;
    }

    isFormEmpty({email, password}) {
        return (
            !email.length ||
            !password.length
        );
    }

    displayError(errors) {
        return errors.map((error, i) => <p key={i}>{error.message}</p>);
    }

    checkAvailability(errors,inputName) {
        return errors.some(function(error) {
            return error.message.toLowerCase().includes(inputName);
        }) ?
        'error'
        :
        '';
    }

    handleChange(event) {
        this.setState({ [event.target.name ]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({errors: []});
        if(this.isFormVaild()) {
            this.setState({loading: true});
            let email = this.state.email;
            let password = this.state.password;
            firebase
                .auth()
                .signInWithEmailAndPassword(email,password)
                .then((user) => {
                    console.log(user);
                    this.setState({loading: false});
                })
                .catch((error) => {
                    this.setState({
                        errors: this.state.errors.concat(error),
                        loading: false
                    });
                })
        }
    }

    render () {
        const {email, password, errors, loading} = this.state;

        return (
            <Grid centered className='app'>
                <GridColumn width='6'>
                    <Header as='h2' icon textAlign='center' color='violet'>
                        <Icon name='slack' />
                        Login for chatA
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment>
                            <FormInput icon='mail'  className={this.checkAvailability(errors,'email')} iconPosition='left' placeholder='Email' type='email' name='email' onChange={this.handleChange} value={email} />
                            <FormInput icon='write' className={this.checkAvailability(errors,'password')} iconPosition='left' placeholder='Password' type='password' name='password' onChange={this.handleChange} vaule={password} />
                            <Button loading={loading ? loading : false} fluid color='violet'>Submit</Button>
                        </Segment>
                    </Form>
                    {
                        //use expresstion js with {}
                        errors.length > 0 &&
                        (
                            <Message error>
                                <Message.Header>Error</Message.Header>
                                {this.displayError(errors)}                  
                            </Message>
                        )
                    }
                    <Message>
                        <p>Don't you have account? <Link to='/register' >Register</Link></p>
                    </Message>
                </GridColumn>
            </Grid>
        );
    }
}

export default Login;
