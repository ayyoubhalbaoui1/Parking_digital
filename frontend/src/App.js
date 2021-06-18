import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import AdminDashboard from "./components/admindashboard";

function App() {

  return (
  <Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
          </Switch>
    </div>
  </Router>
  );
}

export default App;
