//General Import
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import Components
import Landing from './components/layout/Landing';
import PageDetails from './components/layout/PageDetails';

// Styling Imports
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Landing.css';
import './Match.css';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/pagedetails" component={PageDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
