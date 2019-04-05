import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <label htmlFor="username"></label>
            <input 
              value={this.state.username}
              onChange={this.handleInputChange}
              id="username"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input 
              value={this.state.password}
              onChange={this.handleInputChange}
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button type="submit">Sign Up!</button>
          </div>
        </form>
      </div>
    )
  }

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    })
  }

  handleSubmitForm = e => {
    e.preventDefault();
    const endpoint = 'http://localhost:3300/api/register'

    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        this.props.history.push('/jokes');
      })
      .catch(err => {
        console.log('Registration Error: ', err);
      })
  }

}

export default withRouter(Register);