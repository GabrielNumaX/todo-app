import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createBrowserHistory } from "history";

import PrivateRoute from './routes/PrivateRoute';

import Main from './containers/Main/Main'

import Welcome from './containers/Welcome/Welcome';
// import Login from './components/Login/Login';
// import CreateAccount from './components/CreateAccount/CreateAccount';

import axios from 'axios';
import { backendUrl } from './config/config';

const hist = createBrowserHistory();

axios.interceptors.request.use(async (config) => {
  
  config.url = backendUrl + config.url

  console.log('config.url', config.url);

  if(localStorage.token) {
    config.headers = {
      ...config.headers,
      "Authorization": localStorage.getItem("token")
    }
  }
  return config
});

function App(props) {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} history={hist}>

      <Route exact path="/" component={Welcome}></Route>
    
      {/* <Route path="/tasks" component={Main}></Route> */}

      <PrivateRoute exact path='/tasks' component={Main}/>

      {/* <Route exact path="/" component={Login}></Route> */}

      {/* <Route exact path="/" component={CreateAccount}></Route> */}

    </BrowserRouter>
  );
}

// export default App;

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn
})
export default connect(mapStateToProps, null)(App);
