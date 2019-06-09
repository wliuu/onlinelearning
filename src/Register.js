import React, { Component } from 'react';
import Modal from 'react-modal';
import {auth} from './firebase.js';

Modal.setAppElement(document.getElementById('root'));

const initialState = {
  email1: '',
  email2: '',
  password: '',
  error: '',
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  register(e) {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email1, this.state.password)
      .then((user) => {
        this.setState(initialState);
        this.props.setUser(user);
        this.props.hideModalHandler();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
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
        <form onSubmit={this.register}>
          <input
            type="text"
            name="email1"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="username"
          />
          <input
            type="text"
            name="email2"
            placeholder="Confirm Email"
            value={this.state.email2}
            onChange={this.handleChange}
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="new-password"
          />
          <button children="Register" />
          <button onClick={this.cancel}>Cancel</button>
        </form>
      </Modal>
    );
  }
}

export default Register;
