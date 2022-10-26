const db = require('../models/dbConnection');
const bcrypt = require('bcrypt');

const userController = {};

userController.getUser = async (req, res, next) => {
  try {
    console.log('ID ', req.params);
    const { username } = req.params;
    const queryString = 'SELECT * FROM users WHERE username = $1;';
    const values = [username];

    const { rows } = await db.query(queryString, values);
    res.locals.user = rows[0];
    return next();
  } catch (err) {
    return next({
      log: `userController.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: 'An error occurred in userController.getUser. Check server logs for more details',
      },
    });
  }
};

userController.createUser = async (req, res, next) => {
  try {
    const {
      username,
      password,
      age,
      location,
      proglang,
      comment,
      matches,
      url,
    } = req.body;
    if (typeof username !== 'string')
      throw new Error('username should be a string');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)

    const insertUser =
      'INSERT INTO users (username, password, age, location, proglang, comment, matches, url)\
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [
      username,
      hashedPassword,
      age,
      location,
      proglang,
      comment,
      matches,
      url,
    ];
    const { rows } = await db.query(insertUser, values);
    res.locals.user = rows[0];

    return next();
  } catch (err) {
    return next({
      log: `userController.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: `An error occurred in userController.createUser. Err: ${err.message}`,
      },
    });
  }
};

module.exports = userController;