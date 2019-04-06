import React, { Component } from 'react';
import axios from 'axios';

import requireAuth from './auth/requireAuth';

class Jokes extends Component {
  state = {
    jokes: []
  }

  render() {
    return (
      <div>
        <h2>Dad Jokes:</h2>
        <ol>
          {this.state.jokes.map(joke => {
              return (
                <div key={joke.id}>
                  <p>{joke.joke}</p>
                </div>
              )
            })
          }
        </ol>
      </div>
    )
  }

  componentDidMount = () => {
    const endpoint = '/jokes';

    axios
      .get(endpoint)
      .then(res => {
        console.log(res);
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.log('Uh oh - No Jokes, No Joke!', err);
      })
  }

}

export default requireAuth(Jokes);