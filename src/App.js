import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Main from './container/Main/Main'

import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    
      {/* <Route path="/" component={Main}></Route> */}

      <Route exact path="/" component={Login}></Route>

    </BrowserRouter>
  );
}

export default App;
