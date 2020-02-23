const db = require('./database');
const { User } = require('./user');
const { Activity } = require('./activity');
const { Itinerary } = require('./itinerary');

// "duplicate" activities

Activity.belongsTo(Itinerary);
Itinerary.hasMany(Activity);

Itinerary.belongsTo(User);
User.hasMany(Itinerary);
Activity.belongsToMany(User, { through: Itinerary });

module.exports = {
  db,
  User,
  Activity,
  Itinerary,
};
