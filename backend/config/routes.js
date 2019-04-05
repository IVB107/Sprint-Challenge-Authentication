const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig');
const { authenticate, jwtKey } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

// ----- HANDLERS -----

const find = () => {
  return db('users').select('id', 'username', 'password');
}

const findBy = filter => {
  return db('users').where(filter);
}

const findById = id => {
  return db('users')
  .where({ id })
  .first();
}

const add = async user => {
  const [id] = await db('users').insert(user);
  
  return findById(id);
}

const generateToken = user => {
  const payload = {
    subject: user.id, 
    password: user.password
  }
  const options = {
    expiresIn: '2h'
  }
  return jwt.sign(payload, jwtKey, options);
}

// ----- CRUDs -----

// POST --> /api/register
const register = (req, res) => {
  // implement user registration
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  add(user)
    .then(saved => {
      // Use token here if react client routes from /api/register to /api/users
      const token = generateToken(saved);
      res.status(201).json({
        message: `Welcome, ${saved.username}! Please Login.`,
        token
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

// POST --> /api/login
const login = (req, res) => {
  // implement user login
  let { username, password } = req.body;

  findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome back, ${user.username}!`,
          token
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

}

// GET --> /api/jokes
const getJokes = (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
