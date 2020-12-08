import React from 'react';
import './App.css';
import { NavBar } from './app/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { ReportsPage } from './features/reports/ReportsPage';
import { UserPage } from './features/user/UserPage';
function App() {
  return (
    <Router>
      <NavBar />
      <div className="App ">
        <Switch>
          <Route exact path="/reporting" />
          <Route exact path="/reporting/user" component={UserPage} />
          <Route exact path="/reporting/reports" component={ReportsPage}/>
          <Redirect to="/reporting" />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
