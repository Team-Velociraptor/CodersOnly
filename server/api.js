const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/verification', controller.verifyUser, (req, res) => {
  return res.status(201).json(res.locals.userExists);
});

router.post('/', controller.createUser, (req, res) => {
  return res.status(201).json(res.locals.user);
});

router.get('/friends', controller.getFriends, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

router.get('/:username', controller.getUser, (req, res) => {
  // console.log('res.locals.users ' + res.locals.user);
  return res.status(201).json(res.locals.user);
});

router.patch(
  '/:username/:clickedUser/:decision',
  controller.updateUserMatches,
  (req, res) => {
    console.log(res.locals.match);
    return res.status(200).json(res.locals.match);
  }
);

module.exports = router;
