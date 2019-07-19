import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import Spinner from '../general/Spinner';
import './styles/LoginPage.css';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    };
    this.props.logout();

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
    console.log('on sumbit');
    this.props.login(email, password);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/target' />
    }
  }

  renderStatusLogin() {
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      if(this.props.error){
        return (<span className="error-message center">{this.props.error}</span>)
      } 
    }
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

          {this.renderStatusLogin()}

          <button>Iniciar sesión</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = reducers => {
  return reducers.authReducer;
};
export default connect(
  mapStateToProps,
  authActions
)(LoginPage);
