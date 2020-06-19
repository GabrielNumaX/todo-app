import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Main from './container/Main/Main'

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    
      <Route path="/" component={Main}></Route>

    </BrowserRouter>
  );
}

export default App;
