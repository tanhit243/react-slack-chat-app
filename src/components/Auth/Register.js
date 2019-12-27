import React from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn, FormInput } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name ]: event.target.value });
    }

    render () {
        return (
            <Grid centered className='app'>
                <GridColumn width='6'>
                    <Header as='h2' icon textAlign='center' color='orange'>
                        <Icon name='slack' />
                        Register for chatA
                    </Header>
                    <Form>
                        <Segment>
                            <FormInput icon='user'  iconPosition='left' placeholder='Username' type='text' name='username' onChange={this.handleChange} value={this.state.username} />
                            <FormInput icon='mail'  iconPosition='left' placeholder='Email' type='email' onChange={this.handleChange} />
                            <FormInput icon='write' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                            <FormInput icon='repeat' iconPosition='left' placeholder='Password Confirmation' type='password' onChange={this.handleChange} />
                            <Button fluid color='orange'>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>
                        <p>New to chatA? <Link to='/login' >Login</Link></p>
                    </Message>
                </GridColumn>
            </Grid>
        );
    }
}

export default Register;