import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import './App.css';

function App({currentUser}) {
  return (
    <Grid className="app" columns="equal">
      <Grid.Column>
        <ColorPanel />
      </Grid.Column>
      <Grid.Column>
        <SidePanel currentUser={currentUser} />
      </Grid.Column>
      <Grid.Column style={{marginLeft: 320}}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.user.currentUser
  };
}

export default connect(mapStatetoProps)(App);
