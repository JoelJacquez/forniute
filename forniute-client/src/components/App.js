import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './layout/header/Header';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import { history } from './general/History';

// import { HomePage, CarPage, ProfilePage } from './pages';

const App = () => (
  <Router history={history}>
    <Header />
    <div className="wrapper content-body">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/car" component={CarPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/login" component={LoginPage} />
    </div>
  </Router>
);

export default App;
