import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { setLogInOut } from './containers/App/actions';

import { createBrowserHistory } from "history";

import PrivateRoute from './routes/PrivateRoute';

import Main from './containers/Main/Main'

import Welcome from './containers/Welcome/Welcome';

import Guest from './containers/Guest/Guest';

import PasswordReset from './containers/PasswordReset/PasswordReset';

import axios from 'axios';
import { backendUrl } from './config/config';

const hist = createBrowserHistory();

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

  // const useHist = useHistory();

  // console.log('APP')

  // useEffect(() => {

  //   console.log('app useFX')

  //   if(localStorage.token) {

  //     console.log('APP useFX token')

  //     props.setLogInOut(true);

  //     // I have to check that it does NOT ALWAYS redirects to this;
  //     hist.push('/tasks');

  //   }
  // }, [props.isLoggedIn])

  // console.log(hist, 'hist');
  // console.log(useHist, 'useHist');  

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>

      <Switch>

        <Route exact path="/" component={Welcome}></Route>

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
