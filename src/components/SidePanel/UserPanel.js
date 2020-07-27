import React from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';

class UserPanel extends React.Component {
    constructor(props){
        super();
        
        // this.state = {
        //     user: props.currentUser
        // }

        this.dropdownOptions = this.dropdownOptions.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
    }


    dropdownOptions() {
        return [
            {
                key: 'user',
                text: <span>Signed in as <strong>this.state.user.displayName</strong></span>,
                disabled: true
            },
            {
                key: 'avatar',
                text: <span>Change Avatar</span>
            },
            {
                key: 'singout',
                text: <span onClick={this.handleSignout}>Sign Out</span>
            }
        ];
    }

    handleSignout() {
        firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('signed out');
        });
    }

    render () {
        console.log(this);
        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2em', margin: 0}}>
                        <Header
                         as="h2"
                         inverted
                        >
                            <Icon name="code" />
                            <Header.Content>chatA</Header.Content>
                        </Header>
                    </Grid.Row>
                    <Header
                        style={{padding: '0.25em'}}
                        inverted
                        as='h4'
                    >
                        <Dropdown 
                            trigger={
                                <span>User Panel</span>
                            }
                            options={this.dropdownOptions()}
                        />
                    </Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;