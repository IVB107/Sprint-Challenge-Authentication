import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Jokes from './components/jokes/Jokes';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavLink to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/jokes">Jokes</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/register">Register</NavLink>
          <button onClick={this.handleLogout}>Logout</button>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

}


const Home = () => {
  return <h1>CAUTION: Dad Jokes Incoming...</h1>
}

export default withRouter(App);
