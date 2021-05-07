import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { setLogInOut } from './containers/App/actions';

// import { createBrowserHistory } from "history";

import PrivateRoute from './routes/PrivateRoute';

import Main from './containers/Main/Main'

import Welcome from './containers/Welcome/Welcome';

import Guest from './containers/Guest/Guest';

import PasswordReset from './containers/PasswordReset/PasswordReset';

// import Fav from './assets/favico';

import axios from 'axios';
import { backendUrl } from './config/config';

// const hist = createBrowserHistory();

axios.interceptors.request.use(async (config) => {

  config.url = backendUrl + config.url

  console.log('config.url', config.url);

  if (localStorage.token) {
    config.headers = {
      ...config.headers,
      "Authorization": localStorage.getItem("token")
    }
  }
  return config
});



function App(props) {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>

      <Switch>

        <Route exact path="/" component={Welcome}></Route>

        {/* <Route exact path="/" component={Fav}></Route> */}

        <Route exact path="/guest" component={Guest}></Route>

        <Route exact path="/reset-password" component={PasswordReset}></Route>

        <PrivateRoute exact path='/my-tasks' component={Main} />

      </Switch>

    </BrowserRouter>
  );
}

// export default App;

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn
})
export default connect(mapStateToProps, { setLogInOut })(App);
