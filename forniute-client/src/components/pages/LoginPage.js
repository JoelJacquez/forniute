import React, { Component } from 'react';
import './styles/LoginPage.css';
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log('====================================');
    console.log('on sumbit');
    console.log('email ', email);
    console.log('password ', password);
    console.log('====================================');
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1 className="center">Forniute</h1>
          <h2 className="center">Iniciar sesión</h2>

          <label>Usuario </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Correo electrónico"
          />

          <label>Contraseña </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Contraseña"
          />

          <span className="error-message">Error message</span>

          <button>Iniciar sesión</button>
        </form>
      </div>
    );
  }
}
