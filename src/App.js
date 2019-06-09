import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Home from "./Home";
import MySchedule from "./MySchedule";
import Catalog from "./Catalog";
import Register from "./Register";
import Login from "./Login";
import {auth} from './firebase.js';

const history = createBrowserHistory();

const initialState = {
  showRegisterModal: false,
  showLoginModal: false,
  user: null,
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.showRegister = this.showRegister.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user});
      }
    });
  }

  setUser(user) {
    this.setState({
      user: user,
    });
  }

  getUser() {
    return this.state.user;
  }

  showRegister() {
    if (!this.state.showLoginModal) {
      this.setState({showRegisterModal: true});
    }
  }

  hideRegister() {
    this.setState({showRegisterModal: false});
  }

  showLogin() {
    if (!this.state.showRegisterModal) {
      this.setState({showLoginModal: true});
    }
  }

  hideLogin() {
    this.setState({showLoginModal: false});
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
    history.push("/");
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <header className="App-header">
              <span className="left">
                <Link className="header-link" to="/home/">Home</Link>
                <div className="divider"/>
                <Link className="header-link" to="/catalog/">Course Catalog</Link>
                {this.state.user ?
                  <React.Fragment>
                    <div className="divider"/>
                    <Link className="header-link" to="/my_schedule">My Schedule</Link>
                  </React.Fragment>
                  :
                  <div/>
                }
              </span>
              <span className="right">
                {this.state.user ?
                  <div>
                    <p className="username">{this.state.user.email}</p>
                    <div className="divider"/>
                    <button onClick={this.logout}>Log Out</button>
                  </div>
                  :
                  <div>
                    <button onClick={this.showLogin}>Log In</button>
                    <div className="divider"/>
                    <button onClick={this.showRegister}>Register</button>
                  </div>
                }
              </span>
          </header>
          <div>
            <Route path="/catalog/"
              render={() => <Catalog getUser={() => this.getUser()} />} />
            <Route path="/home/" component={Home} />
            <Route path="/my_schedule"
              render={() => <MySchedule getUser={() => this.getUser()} />} />
            <Route path="/" exact component={Home} />
            <Login
              showModal={this.state.showLoginModal}
              hideModalHandler={() => this.hideLogin()}
              setUser={(user) => this.setUser(user)}
              history={history}
            />
            <Register
              showModal={this.state.showRegisterModal}
              hideModalHandler={() => this.hideRegister()}
              setUser={(user) => this.setUser(user)}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
