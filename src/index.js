import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import firebase from './firebase';
import rootReducer from '../src/reducers';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser } from './actions';
import Spiner from './Spiner';

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.setUser(user);
        this.props.history.push('/');
      }
    })
  }

  render() {
    return this.props.isLoading ? <Spiner /> : (
          <Switch>
              <Route exact path="/" component={App} />
              <Route path="/login">
                  <Login />
              </Route>
              <Route path="/register" component={Register} />
          </Switch>
    );
  }
}
const store = createStore(rootReducer,composeWithDevTools());
const mapStateFromProps = state => {
  return(
    {
      isLoading: state.user.isLoading
    }
  )
}
const Authentication = withRouter(connect(mapStateFromProps,{ setUser })(Root));

//The connect() function connects a React component to a Redux store.
const Authentication = withRouter(connect(mapStateFromProps,{ setUser })(Root)); 


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Authentication />  
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
