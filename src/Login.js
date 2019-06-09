import React, { Component } from 'react';
import Modal from 'react-modal';
import {auth} from './firebase.js';

Modal.setAppElement(document.getElementById('root'));

const initialState = {
  email1: '',
  password: '',
  error: '',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  login(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email1, this.state.password)
      .then((user) => {
        this.setState(initialState);
        this.props.setUser(user);
        this.props.hideModalHandler();
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        this.setState({ error: error });
      });
  }

  cancel() {
    this.props.hideModalHandler();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.showModal}>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="email1"
            placeholder="Email"
            value={this.state.email1}
            onChange={this.handleChange}
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="current-password"
          />
          <button children="Log In" />
          <button onClick={this.cancel}>Cancel</button>
        </form>
      </Modal>
    );
  }
}

export default Login;
