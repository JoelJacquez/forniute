import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './layout/header/Header';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import ProfilePage from './pages/ProfilePage';

// import { HomePage, CarPage, ProfilePage } from './pages';


const App = () => (
  <BrowserRouter>
    <Header/>
    <div className="wrapper">
      <Route exact path='/' component={ HomePage } />
      <Route exact path='/car' component={ CarPage } />
      <Route exact path='/profile' component={ ProfilePage } />
    </div>
  </BrowserRouter>
);



export default App;
