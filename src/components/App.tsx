import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';

const App: React.FC = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Login}/>
            {/* <Route exact path="/" component={Login}/> */}
         </Switch>
      </Router>
   );
}

export default App;
