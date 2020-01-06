import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

// const Root = () => (
//     <Router>
//         <Switch>
//             <Route exact path="/" component={App} />
//             <Route path="/login">
//                 <Login />
//             </Route>
//             <Route path="/register" component={Register} />
//         </Switch>
//     </Router>
// );

// ReactDOM.render(<Root />, document.getElementById('root'));


// export default function AuthExample() {
//   return (
//     <Router>
//       <div>
//         <AuthButton />

//         <ul>
//           <li>
//             <Link to="/public">Public Page</Link>
//           </li>
//           <li>
//             <Link to="/protected">Protected Page</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/public">
//             <PublicPage />
//           </Route>
//           <Route path="/login">
//             <LoginPage />
//           </Route>
//           <PrivateRoute path="/protected">
//             <ProtectedPage />
//           </PrivateRoute>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// function AuthButton() {
//   let history = useHistory();

//   return fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome!{" "}
//       <button
//         onClick={() => {
//           fakeAuth.signout(() => history.push("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   );
// }

// // A wrapper for <Route> that redirects to the login
// // screen if you're not yet authenticated.
// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         fakeAuth.isAuthenticated ? (
//           children
//         ) : (   
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// function PublicPage() {
//   return <h3>Public</h3>;
// }

// function ProtectedPage() {
//   return <h3>Protected</h3>;
// }

// function LoginPage() {
//     let history = useHistory();
//     let location = useLocation();

//     console.log(history);
//     console.log(location);
//     // Vì history là mutable nên khuyên dùng location từ  prop <Route> không phải từ history.location.
//     let { from } = location.state || { from: { pathname: "/" } };console.log({from});
//     let login = () => {
//         fakeAuth.authenticate(() => {
//         history.replace(from);
//         });
//     };

//     return (
//         <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={login}>Log in</button>
//         </div>
//     );
// }

// ReactDOM.render(<AuthExample />, document.getElementById('root'));

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
    // static propTypes = {
    //   match: PropTypes.object.isRequired,
    //   location: PropTypes.object.isRequired,
    //   history: PropTypes.object.isRequired
    // };

    render() {
        console.log(this.props);
        const { match, location, history } = this.props;
    
        return <div>You are now at {location}</div>;
    }
}
  
  // Create a new component that is "connected" (to borrow redux
  // terminology) to the router.
//   const ShowTheLocationWithRouter = withRouter(ShowTheLocation);

  ReactDOM.render(
    <Router>
        <ShowTheLocation />   
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
