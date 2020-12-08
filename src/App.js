import React from 'react';
import './App.css';
import { NavBar } from './app/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { TasksPage } from './features/tasks/TasksPage';
import { UserPage } from './features/user/UserPage';
function App() {
  return (
    <Router>
      <NavBar />
      <div className="App ">
        <Switch>
          <Route exact path="/solving" />
          <Route exact path="/solving/user" component={UserPage} />
          <Route exact path="/solving/tasks" component={TasksPage}/>
          <Redirect to="/solving" />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
