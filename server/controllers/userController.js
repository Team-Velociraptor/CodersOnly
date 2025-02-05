const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.getUser = async (req, res, next) => {
  try {
    //console.log('ID ', req.params);
    const { username } = req.params;
    res.locals.user = await User.findOne({ username }).exec();
    return next();
  } catch (err) {
    return next({
      log: `controller.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: 'An error occurred in controller.getUser. Check server logs for more details',
      },
    });
  }
};

userController.createUser = async (req, res, next) => {
  try {
    let { username, password, age, location, proglang, comment, matches, url } =
      req.body;

    // Be-crypt the password passed in.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if the user entered a username that is a string.
    if (typeof username !== 'string')
      throw new Error('username should be a string');

    // Set default profile picture for images that don't load.
    const imgTest = link => {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(link);
    };

    if (!imgTest(url) || url === '') {
      url =
        'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
    }

    res.locals.user = await User.create({
      username,
      password: hashedPassword,
      age,
      location,
      proglang,
      comment,
      matches,
      url,
    });
    return next();
  } catch (err) {
    return next({
      log: `controller.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: 'An error occurred in controller.createUser. Check server logs for more details',
      },
    });
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { age, location, comment, proglang, url } = req.body;

    const updateObj = {
      $set: {
        age: age,
        location: location,
        comment: comment,
        proglang: proglang,
        url: url,
      },
    };

    res.locals.user = await User.updateOne({ username }, updateObj).exec();
    return next();
  } catch (err) {
    return next({
      log: `controller.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: 'An error occurred in userController.updateUser. Check server logs for more details',
      },
    });
  }
};

userController.unmatchUser = async (req, res, next) => {
  try {
    const { username, clickedUser } = req.body;

    let { matches } = await User.findOne({ username: username });

    matches = {
      ...matches,
      [clickedUser]: 'no',
    };

    const updateObj = {
      $set: {
        matches: matches,
      },
    };

    res.locals.user = await User.updateOne({ username }, updateObj).exec();

    return next();
  } catch (err) {
    return next({
      log: `controller.js: ERROR: ${err}`,
      status: 400,
      message: {
        err: 'An error occurred in userController.unmatchUser. Check server logs for more details',
      },
    });
  }
};

module.exports = userController;

////////////// SEQUEL CONVERSIONS BELOW //////////////
// const db = require('../models/dbConnection');

// userController.getUser = async (req, res, next) => {
//   try {
//     console.log('ID ', req.params);
//     const { username } = req.params;
//     const queryString = 'SELECT * FROM users WHERE username = $1;';
//     const values = [username];

//     const { rows } = await db.query(queryString, values);
//     res.locals.user = rows[0];
//     return next();
//   } catch (err) {
//     return next({
//       log: `userController.js: ERROR: ${err}`,
//       status: 400,
//       message: {
//         err: 'An error occurred in userController.getUser. Check server logs for more details',
//       },
//     });
//   }
// };

// userController.createUser = async (req, res, next) => {
//   try {
//     const {
//       username,
//       password,
//       age,
//       location,
//       proglang,
//       comment,
//       matches,
//       url,
//     } = req.body;
//     if (typeof username !== 'string')
//       throw new Error('username should be a string');

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log(hashedPassword)

//     const insertUser =
//       'INSERT INTO users (username, password, age, location, proglang, comment, matches, url)\
//       VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
//     const values = [
//       username,
//       hashedPassword,
//       age,
//       location,
//       proglang,
//       comment,
//       matches,
//       url,
//     ];
//     const { rows } = await db.query(insertUser, values);
//     res.locals.user = rows[0];

//     return next();
//   } catch (err) {
//     return next({
//       log: `userController.js: ERROR: ${err}`,
//       status: 400,
//       message: {
//         err: `An error occurred in userController.createUser. Err: ${err.message}`,
//       },
//     });
//   }
// };
