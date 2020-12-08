import React from 'react';
import './App.css';
import { NavBar } from './app/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {EmployeesPage} from './features/employees/EmployeesPage';
import { EmployeeRow } from './features/employees/EmployeeRow';
import {TasksPage} from './features/tasks/TasksPage';
import {TaskRow} from './features/tasks/TaskRow';
import { ReportsPage } from './features/reports/ReportsPage';
import { UserPage } from './features/user/UserPage';
function App() {
  return (
    <Router>
      <NavBar />
      <div className="App ">
        <Switch>
          <Route exact path="/management" />
          <Route exact path="/management/user" component={UserPage} />
          <Route exact path="/management/employees" component={EmployeesPage}/>
          <Route exact path="/management/tasks" component={TasksPage}/>
          <Route exact path="/management/reports" component={ReportsPage}/>
          <Redirect to="/management" />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
