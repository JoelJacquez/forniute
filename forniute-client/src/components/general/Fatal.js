import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Fatal.css';
const Fatal = props => {
  return (
    <div id="fatal-error-container">
      <div className="fatal-error-container">
        <div className="fatal-error">
          <h1>Oops!</h1>
          <h2>{props.message}</h2>
        </div>
        <Link to="/">Ir al la página de inicio</Link>
      </div>
    </div>
  );
};

export default Fatal;
