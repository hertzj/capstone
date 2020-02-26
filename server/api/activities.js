const router = require("express").Router();
const { Activity } = require("../db");

router.get("/", (req, res, next) => {
  Activity.findAll()
    .then(allActivities => {
      if (allActivities.length) {
        res.status(200).send(allActivities);
      } else {
        res.status(404).send("No activities found!");
      }
    })
    .catch(err => next(err));
});

module.exports = router;
