const router = require('express').Router();
const { User } = require('../db/index');

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(userOrNull => {
      if (userOrNull && !userOrNull.isPasswordValid(req.body.password)) {
        res.sendStatus(400);
      } else if (!userOrNull) res.sendStatus(401);
      else {
        req.session.id = userOrNull.id;
        res.status(200).send(userOrNull);
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.findOrCreate({
    where: req.body,
  })
    .then(user => {
      if (!user) res.status(500).send('error creating user');
      else {
        req.session.id = user.id;
        res.status(201).send(user);
      }
    })
    .catch(next);
});

router.get('/singout', (req, res, next) => {
  delete req.session.id;
  res.sendStatus(204);
  next();
});

router.get('/me', (req, res, next) => {
  if (req.loggedIn) return res.send(req.user);
  res.status(401);
  const err = new Error('not logged in');
  console.error(err);
  next();
});

module.exports = router;
