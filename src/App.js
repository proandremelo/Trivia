import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}
