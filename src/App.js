import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Main from './containers/Main/Main'

import Welcome from './containers/Welcome/Welcome';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>

      <Route exact path="/" component={Welcome}></Route>
    
      {/* <Route path="/" component={Main}></Route> */}

      {/* <Route exact path="/" component={Login}></Route> */}

      {/* <Route exact path="/" component={CreateAccount}></Route> */}

    </BrowserRouter>
  );
}

export default App;
