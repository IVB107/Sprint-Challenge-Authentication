import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3300/api';

axios.interceptors.request.use(function(requestConfig) {
  const token = localStorage.getItem('token');
  requestConfig.headers.authorization = token;
  return requestConfig;
});

export default (Component) => {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('token');
      const notLoggedIn = <h3>Please Log In</h3>
  
      // return axios.create({ headers: { authorization: token } });
      return <>{ token ? <Component {...this.props}/> : notLoggedIn }</>
    }
  }
}