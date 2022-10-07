import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Play from './pages/Play'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route  path="/play" component={ Play }/>
    </Switch>
  );
}
