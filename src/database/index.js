const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../database/models/userModel.js');

const connection = new Sequelize(dbConfig);
User.init(connection);

module.exports = connection;