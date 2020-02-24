const Sequelize = require('sequelize');
const db = require('./database');

const { STRING, UUID, UUIDV4, DECIMAL, GEOMETRY, TIME, ENUM } = Sequelize;

const Activity = db.define('activity', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  location: {
    type: GEOMETRY('POINT'),
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  startTime: {
    type: TIME,
  },
  endTime: {
    type: TIME,
  },
  duration: {
    type: DECIMAL(10, 2), // I think the best way to calculate duration is in quarter hours
  },
  rating: {
    type: ENUM(1, 2, 3, 4, 5),
  },
});

module.exports = Activity;
